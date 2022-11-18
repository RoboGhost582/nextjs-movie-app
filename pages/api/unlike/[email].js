import connectMongo from '../../../database/conn';
import Users from '../../../model/User'

//http://localhost:3000/api/unlike/[email]

export default async function handler(req, res) {
  connectMongo().catch(error => res.json({ error: "Connection Failed...!" }))

  if (req.method === 'PUT') {
    //return res.status(200).json(req.query)
    const {email} = req.query
    const {id} = req.body

    const userExist = await Users.findOne({email: email })

    if(userExist.savedShows.find(item => item.id === id)){
      await userExist.updateOne({ $pull: { savedShows: req.body } })
      return res.status(200).json({ message: "Movie has been removed" })
    }else{
      return res.status(200).json({ message: "Movie is already in the list" })
    }

  }



}