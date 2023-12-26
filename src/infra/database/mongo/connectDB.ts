import mongoose from "mongoose"

const connectDB = () => {
  const mongoURI: string = 'mongodb://127.0.0.1:27017/customers'
  mongoose.connect(mongoURI)
    .then(() => {
      console.log('Database connected!')
    })
    .catch((error) => {
      throw new Error(`Error (${error}) during database connection!`);
    })
}

connectDB()
