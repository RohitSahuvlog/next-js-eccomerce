import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
    await mongooseConnect();
    const featuredProductId = '66f3105440882e441e9d97ef';
    const featuredProduct = await Product.findById(featuredProductId);
    res.status(200).json(featuredProduct);
}
