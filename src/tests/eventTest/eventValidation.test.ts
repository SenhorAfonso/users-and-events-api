import ValidateEvent from "../../app/validations/Event/ValidateEvent";
import testValidateObject from "../../app/utils/testUtils/testValidateObject";

describe('Validation payload for create event route', () => {

  describe('Validate dayOfWeek field and value', () => {

    it('Should return a ""dayOfWeek" must be one of <list>" error', () => {
      const eventPayload = {
        "dayOfWeek": "invalid",
        "description": "Evento 1"
      }

      const error = testValidateObject(ValidateEvent.createEvent(), eventPayload).error?.details[0]!;

      expect(error.message).toMatch('\"dayOfWeek\" must be one of [sunday, monday, tuesday, wednesday, thursday, friday, saturday]');
      expect(error.path).toStrictEqual(['dayOfWeek']);

    })

    it('Should return a ""dayOfWeek" is required" error', () => {
      const eventPayload = {
        "invalid": "monday",
        "description": "Evento 1"
      }

      const error = testValidateObject(ValidateEvent.createEvent(), eventPayload).error?.details[0]!;

      expect(error.message).toMatch('\"dayOfWeek\" is required');
      expect(error.path).toStrictEqual(['dayOfWeek']);

    })

  })
})