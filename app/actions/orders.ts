'use server';

import { writeClient } from '@/sanity/lib/client';

export async function createOrder(orderData: any) {
  try {
    // 1. Process items and upload assets
    const itemsWithAssetRefs = await Promise.all(orderData.items.map(async (item: any) => {
      let assetRefs: any[] = [];
      
      if (item.assets && item.assets.length > 0) {
        assetRefs = await Promise.all(item.assets.map(async (base64: string, index: number) => {
          try {
            // Convert base64 to Buffer
            const base64Data = base64.split(',')[1];
            if (!base64Data) return null;
            
            const buffer = Buffer.from(base64Data, 'base64');
            const asset = await writeClient.assets.upload('image', buffer, {
              filename: `order-${orderData.customerEmail}-${index}-${Date.now()}.png`
            });
            
            return {
              _type: 'image',
              _key: `asset-${index}-${Date.now()}`,
              asset: {
                _type: 'reference',
                _ref: asset._id
              }
            };
          } catch (e) {
            console.error('Asset upload failed for item:', item.name, e);
            return null;
          }
        }));
      }

      return {
        _key: `item-${Math.random().toString(36).substr(2, 9)}`,
        productName: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        assets: assetRefs.filter(Boolean)
      };
    }));

    // 2. Create the order document
    const doc = {
      _type: 'order',
      orderNumber: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      shippingAddress: orderData.shippingAddress,
      items: itemsWithAssetRefs,
      totalAmount: orderData.totalAmount,
      status: 'pending', // Use 'pending' initially
      paymentStatus: 'pending',
      orderStatus: 'Pending',
      createdAt: new Date().toISOString(),
    };

    const result = await writeClient.create(doc);
    return { success: true, orderId: result._id, orderNumber: doc.orderNumber };
  } catch (error: any) {
    console.error('Order creation failed:', error);
    return { success: false, error: error.message || 'Failed to create order' };
  }
}
