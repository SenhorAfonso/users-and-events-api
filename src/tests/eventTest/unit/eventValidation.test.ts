import ValidateEvent from "../../../app/validations/Event/ValidateEvent";
import TestUtils from "../../../app/utils/testUtils/TestUtils";

describe('Validation payload for create event route', () => {

  describe('Validate dayOfWeek field and value', () => {

    it('Should return a ""dayOfWeek" must be one of <list>" error', () => {
      const eventPayload = {
        "dayOfWeek": "invalid",
        "description": "Evento 1"
      }

      const error = TestUtils.validateObject(ValidateEvent.createEvent(), eventPayload).error?.details[0]!;

      expect(error.message).toMatch('\"dayOfWeek\" must be one of [sunday, monday, tuesday, wednesday, thursday, friday, saturday]');
      expect(error.path).toStrictEqual(['dayOfWeek']);

    })

    it('Should return a ""dayOfWeek" is required" error', () => {
      const eventPayload = {
        "invalid": "monday",
        "description": "Evento 1"
      }

      const error = TestUtils.validateObject(ValidateEvent.createEvent(), eventPayload).error?.details[0]!;

      expect(error.message).toMatch('\"dayOfWeek\" is required');
      expect(error.path).toStrictEqual(['dayOfWeek']);

    })
  })

  describe('Validade description field and value', () => {

    it('Should return a \"description\" is not allowed to be empty" error', () => {
      const eventPayload = {
        "dayOfWeek": "monday",
        "description": ""
      }

      const error = TestUtils.validateObject(ValidateEvent.createEvent(), eventPayload).error?.details[0]!;

      expect(error.message).toMatch('\"description\" is not allowed to be empty');
      expect(error.path).toStrictEqual(['description']);

    })

    it('Should return a "invalid is not allowed" error for extra fields', () => {
      const eventPayload = {
        "dayOfWeek": "monday",
        "invalid": "Evento 1"
      }

      const error = TestUtils.validateObject(ValidateEvent.createEvent(), eventPayload).error?.details[0]!;

      expect(error.message).toMatch('\"invalid\" is not allowed');
      expect(error.path).toStrictEqual(['invalid']);

  })
  })
})