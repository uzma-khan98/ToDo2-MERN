import mongoose from 'mongoose'

export const connectToDB = async () => {
  try {
    const connection = await mongoose.connect("mongodb+srv://uzmauk1998_db_user:e3GiIuFhkqe4j9Dn@cluster0.uiet2ij.mongodb.net/TodosDB?appName=Cluster0")
    if (connection) {
      console.log("Connection established to MongoDB!")
    }
  } catch (error) {
    console.log("Error with connection to DB:", error)
  } 
}

