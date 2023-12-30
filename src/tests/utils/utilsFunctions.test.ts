import createQueryById from "../../app/utils/createQueryById"
import createQueryByObject from "../../app/utils/createQueryByObject";
import IQueryByIdParams from "../../interfaces/Events/IQueryByIdParams"
import IQueryByObjectParams from "../../interfaces/Events/IQueryByObjectParams";

describe('Create query by id function', () => {

  it('Should return a empty object if input object has no id member', () => {
    const queryObjectParams: IQueryByIdParams = {};

    const queryObject = createQueryById(queryObjectParams);

    expect(queryObject).toEqual({});

  })

  it('Should return a object with a id number if input object has a id member', () => {
    const id: string = 'testId';
    const queryObjectParams: IQueryByIdParams = { id };

    const queryObject = createQueryById(queryObjectParams);

    expect(queryObject).toEqual({ _id: id });
  })

})

describe('Create query by object', () => {

  describe('the "description" property', () => {

    it('Should be in the query object if it was in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {
        description: 'evento 1'  
      }

      const queryObject = createQueryByObject(queryObjectParams);

      expect(queryObject).toHaveProperty('description', 'evento 1');

    })

    it('Should not be in the query object if it was not in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {}

      const queryObject = createQueryByObject(queryObjectParams);

      expect(queryObject).toEqual({});

    })

  })

  describe('the "dayOfWeek" property', () => {

    it('Should be in the query object if it was in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {
        dayOfWeek: 'monday'  
      }

      const queryObject = createQueryByObject(queryObjectParams);

      expect(queryObject).toHaveProperty('dayOfWeek', 'monday');

    })

    it('Should not be in the query object if it was not in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {}

      const queryObject = createQueryByObject(queryObjectParams);

      expect(queryObject).toEqual({});

    })

  })

  describe('the "limit" property', () => {

    it('Should be in the query object if it was in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {
        limit: 1  
      }

      const queryObject = createQueryByObject(queryObjectParams);

      expect(queryObject).toHaveProperty('limit', 1);

    })

    it('Should not be in the query object if it was not in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {}

      const queryObject = createQueryByObject(queryObjectParams);

      expect(queryObject).toEqual({});

    })

  })

  describe('the "sort" property', () => {

    it('Should be in the query object if it was in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {
        sort: 'asc'  
      }

      const queryObject = createQueryByObject(queryObjectParams);

      expect(queryObject).toHaveProperty('sort', 'asc');

    })

    it('Should not be in the query object if it was not in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {}

      const queryObject = createQueryByObject(queryObjectParams);

      expect(queryObject).toEqual({});

    })

  })

})