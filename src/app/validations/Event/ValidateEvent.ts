import Joi from "joi";

const MIN_DESCRIPTION_LENGHT: number = 5;

class ValidateEvent {

  static createEvent() {
    const createEventValidator = Joi.object({
      description: Joi.string()
        .min(MIN_DESCRIPTION_LENGHT),

      dayOfWeek: Joi.string()
        .valid('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday')
        .required()
    })

    return createEventValidator;
  }

  static getAll() {
    const getAllQueryObjectValidator = Joi.object({
      description: Joi.string()
        .min(MIN_DESCRIPTION_LENGHT),

      dayOfWeek: Joi.string()
        .valid('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday')
    })

    return getAllQueryObjectValidator;
  }

}

export default ValidateEvent