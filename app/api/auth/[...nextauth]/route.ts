import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import db from '@/lib/db'

const  handler =  NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ],
    callbacks:{
        async signIn(params) {
            console.log(params);
            try {
                await db.user.create({
                    data: {
                        email: params.user.email ?? "",
                        provider:"Google"
                    }
                })
            } catch (error) {
                console.log(error);
                
            }
            return true;
            
        },
    }
})

export {handler as GET , handler as POST}

