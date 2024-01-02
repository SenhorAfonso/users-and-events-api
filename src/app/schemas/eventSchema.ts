import mongoose from 'mongoose';

const MIN_LENGHT_EVENT_DESCRIPTION: number = 5;

const eventSchema = new mongoose.Schema({

  description: {
    type: String,
    minLenght: [MIN_LENGHT_EVENT_DESCRIPTION, 'Event description must be more than 5 characters']
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

});

export default mongoose.model('eventSchema', eventSchema);