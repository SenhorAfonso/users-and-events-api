import mongoose from "mongoose"

export default async () => {
  try {
    const mongoURI: string = 'mongodb://127.0.0.1:27017/customers'
    mongoose.connect(mongoURI)
      .then(() => {
        console.log('Database connected!')
      })
  } catch (error) {
    console.log(`Error (${error}) during database connection!`)
  }
}
