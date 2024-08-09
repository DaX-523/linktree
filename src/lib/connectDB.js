import mongoose from "mongoose";
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose
      .connect(
        "mongodb+srv://dax523:7355608@cluster0.poi9kq7.mongodb.net/linktree",
        //Add yout own connect string from the mongo db atlas
        opts
      )
      .then((mongoose) => {
        console.log("Db Connected!");
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
export default connectDB;
