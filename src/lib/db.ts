import mongoose from "mongoose";

declare global {
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cache =
  global.mongooseCache ??
  (global.mongooseCache = {
    conn: null,
    promise: null,
  });

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in your environment variables");
  }

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
      })
      .then((connection) => connection)
      .catch((error: unknown) => {
        cache.promise = null;
        const message =
          error instanceof Error
            ? `${error.message}. If you use MongoDB Atlas, whitelist your current IP in Atlas Network Access.`
            : "Unknown MongoDB connection error";
        throw new Error(message);
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
