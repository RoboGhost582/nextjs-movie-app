import connectMongo from '../../../database/conn';
import Users from '../../../model/User'

//http://localhost:3000/api/users/[email]

export default async function handler(req, res) {
  connectMongo().catch(error => res.json({ error: "Connection Failed...!" }))

  // only post method is accepted
  if (req.method === 'GET') {
    const {email} = req.query

    const user = await Users.findOne({email: email})

    if (!user) {
      return res.status(200).json({ message: "User not found" })
    } else{
      return res.status(200).json({
        savedShows: user.savedShows
      })
    }
  }

  if (req.method === 'PUT') {
    //return res.status(200).json(req.query)
    const {email} = req.query
    const {id} = req.body

    const userExist = await Users.findOne({email: email })

    if(!userExist.savedShows.find(item => item.id === id)){
      await userExist.updateOne({ $push: { savedShows: req.body } })
      return res.status(200).json({ message: "Array up dated" })
    }else{
      return res.status(200).json({ message: "Movie is already in the list" })
    }

  }



}