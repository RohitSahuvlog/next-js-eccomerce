import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = process?.env?.MONGODB_URI || "mongodb+srv://RohitSahu:Rohit1090@cluster0.iepjb1n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    return mongoose.connect(uri);
  }
}