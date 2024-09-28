import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  if (req.method === 'POST') { // Check if the request is a POST request
    await mongooseConnect();
    const ids = req.body.ids;
    res.json(await Product?.find({ _id: ids }));
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}