import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
    await mongooseConnect();
    const products = await Product.find({}, null, { sort: { '_id': -1 } });
    res.status(200).json(products);
}
