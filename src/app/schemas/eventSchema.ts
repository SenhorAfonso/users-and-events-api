import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

  description: {
    type: String,
    minLenght: [5, 'Event description must be more than 5 characters']
  },
  dayOfWeek: {
    type: String,
    enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    require: [true, 'You need to provide a day of week for your event.']
  },
  userId: {
    type: mongoose.Types.ObjectId,
    require: [true, 'You need to provide a owner for your event.']
  }
  
})

export default mongoose.model('eventSchema', eventSchema);