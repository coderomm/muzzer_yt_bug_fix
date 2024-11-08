import  { Account, NextAuthOptions, Profile, Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import prisma from '@/lib/db'
import Credentials from "next-auth/providers/credentials";
import { emailSchema, passwordSchema } from "@/schema/credentials-schema";
import bcrypt from "bcryptjs";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { JWT } from "next-auth/jwt";

console.log(process.env.Hello)

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        Credentials({
            credentials:{
                email : {type:"email"},
                password: {type:"password"}
            },
            async authorize(credentials) {
                if(!credentials || !credentials.email || !credentials.password) {
                    return null;
                }
                const emailVaildation = emailSchema.safeParse(credentials.email)

                if(!emailVaildation.success) {
                    throw new Error("Invalid Email")
                }

                const passwordValidation = passwordSchema.safeParse(credentials.password)

                if(!passwordValidation.success) {
                    throw new Error(passwordValidation.error.issues[0].message);
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email:emailVaildation.data,

                        }
                    });

                    if(!user) {
                        const hashedPassword = await bcrypt.hash(passwordValidation.data , 10)

                        const newUser = await prisma.user.create({
                            data: {
                                email: emailVaildation.data,
                                password: hashedPassword,
                                provider:"Creadentials"
                            }
                        });

                        return newUser;
                    }

                    if(!user.password) {
                        const hashedPassword = await bcrypt.hash(passwordValidation.data , 10);

                        const authUser = await prisma.user.update({
                            where: {
                                email: emailVaildation.data,
                            
                            },
                            data: {
                                password: hashedPassword
                            }
                        })

                        return authUser;
                    }

                    const passwordVerification = await bcrypt.compare(passwordValidation.data , user.password);

                    if(!passwordVerification) {
                        throw new Error("Invalid Password")
                    }
                    return user;
                } catch (error) {

                    if (error instanceof PrismaClientInitializationError) {
                        throw new Error("Internal server error");
                    }
                    console.log(error);
                    throw error;
                    
                }
            },
        })
    ],
    pages: {
        signIn: '/auth'
    },
    secret: process.env.AUTH_SECRET ?? "secret",
    debug: true,
    session: {
        strategy: "jwt"
    },
    callbacks:{
        async jwt({token , account , profile}: {token: JWT , account?: Account | null , profile?:Profile}) {
            if(account && profile){
                token.email = profile.email as string;
                token.id = account.access_token;
            }
            return token;
        },
        async session({session, token}: {session: Session,token: JWT}) {
            try {
                const user = await prisma.user.findUnique({
                    where:{
                        email: token.email ?? ""
                    }
                });
                if(user) {
                    session.user.id = user.id    
                }
            } catch (error) {
                if (error instanceof PrismaClientInitializationError) {
                    throw new Error("Internal server error");
                }
                console.log(error);
                throw error;
            }
            return session;
        },
        async signIn({ account, profile }) {
            try {
                if (account?.provider === "google") {
        
                  const user = await prisma.user.findUnique({
                    where: {
                      email: profile?.email ?? "",
                    }
                  });
                  if (!user) {
                    await prisma.user.create({
                      data: {
                        email: profile?.email ?? "",
                        name: profile?.name || undefined,
                        provider: "Google"
                      }
                    });
                  }
                }
                return true;
            } catch (error) {
                console.log(error);
                //throw error;
                return false;
            }
            return true;
        }
        
    }
}  satisfies NextAuthOptions