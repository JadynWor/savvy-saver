import clientPromise from "./db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { AuthOptions } from "next-auth";


export const authOptions = {
    // Configure one or more authentication providers
    secret: process.env.SECRET,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
      AppleProvider({
        clientId: process.env.APPLE_ID as string,
        clientSecret: process.env.APPLE_SECRET as string,
      })
      // ...add more providers here
    ],
    adapter: MongoDBAdapter(clientPromise),
} as AuthOptions;