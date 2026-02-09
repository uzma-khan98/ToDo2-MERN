import mongoose from 'mongoose'


export const connectToDB = async () => {
  try {
    const connection = await mongoose.connect("MONGO_URI")
    if (connection) {
      console.log("Connection established to MongoDB!")
    }
  } catch (error) {
    console.log("Error with connection to DB:", error)
  } 
}

