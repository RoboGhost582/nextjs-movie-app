import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '../../../database/conn'
import Users from '../../../model/User'
import { compare } from 'bcryptjs';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"



export default NextAuth({
    providers : [
        // Google Provider
        GoogleProvider({
            clientId: `${process.env.GOOGLE_ID}`,
            clientSecret: `${process.env.GOOGLE_SECRET}`
        }), 
        CredentialsProvider({
            id: "credentials",
            name : "Credentials",
            async authorize(credentials, req){
                connectMongo().catch(error => { error: "Connection Failed...!"})

                // check user existance
                const result = await Users.findOne( { email : credentials.email})
                if(!result){
                    throw new Error("No user Found with Email Please Sign Up...!")
                }

                // compare()
                const checkPassword = await compare(credentials.password, result.password);
                console.log(checkPassword)
                
     
                // incorrect password for Login  
                if(credentials.password !== result.password || result.email !== credentials.email){
                    return result;
                } else if(!checkPassword  || result.email !== credentials.email){
                    return result;
                }else{
                    throw new Error("Username or Password doesn't match");
                }
                
            }, 
        }), 
        

    ],
    adapter: MongoDBAdapter(clientPromise),
    secret:  `${process.env.SECRET}`,
    session: {
        strategy: 'jwt',
    }
})