import connectMongo from '../../../database/conn';
import Users from '../../../model/User'
import { hash, genSalt } from 'bcryptjs';

//http://localhost:3000/api/auth/signup

export default async function handler(req, res){
    connectMongo().catch(error => res.json({ error: "Connection Failed...!"}))

    // only post method is accepted
    if(req.method === 'POST'){

        if(!req.body) return res.status(404).json({ error: "Don't have form data...!"});
        const { email, password } = req.body;

        // hash password
        const salt = await genSalt(10);
        Users.create({ email, password : await hash(password, salt)}, function(err, data){
            if(err) return res.status(404).json({ err });
            res.status(201).json({ status : true, user: data})
        })

    } else{
        res.status(500).json({ message: "HTTP method not valid only POST Accepted"})
    }

}