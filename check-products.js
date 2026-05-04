import { client } from "./utils/sanityClient.js";

async function checkProducts() {
  const products = await client.fetch('*[_type == "product"] { title, price }');
  console.log(JSON.stringify(products, null, 2));
}

checkProducts();
