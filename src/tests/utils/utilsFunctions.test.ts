import APIUtils from '../../app/utils/ApiUtils';
import IQueryByIdParams from '../../interfaces/Events/IQueryByIdParams';
import IQueryByObjectParams from '../../interfaces/Events/IQueryByObjectParams';

describe('Create query by id function', () => {

  it('Should return a empty object if input object has no id member', () => {
    const queryObjectParams: IQueryByIdParams = {};

    const queryObject = APIUtils.createQueryById(queryObjectParams);

    expect(queryObject).toEqual({});

  });

  it('Should return a object with a id number if input object has a id member', () => {
    const id: string = 'testId';
    const queryObjectParams: IQueryByIdParams = { id };

    const queryObject = APIUtils.createQueryById(queryObjectParams);

    expect(queryObject).toEqual({ _id: id });
  });

});

describe('Create query by object', () => {

  describe('the "description" property', () => {

    it('Should be in the query object if it was in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {
        description: 'evento 1'
      };

      const queryObject = APIUtils.createQueryByObject(queryObjectParams);

      expect(queryObject).toHaveProperty('description', 'evento 1');

    });

    it('Should not be in the query object if it was not in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {};

      const queryObject = APIUtils.createQueryByObject(queryObjectParams);

      expect(queryObject).toEqual({});

    });

  });

  describe('the "dayOfWeek" property', () => {

    it('Should be in the query object if it was in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {
        dayOfWeek: 'monday'
      };

      const queryObject = APIUtils.createQueryByObject(queryObjectParams);

      expect(queryObject).toHaveProperty('dayOfWeek', 'monday');

    });

    it('Should not be in the query object if it was not in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {};

      const queryObject = APIUtils.createQueryByObject(queryObjectParams);

      expect(queryObject).toEqual({});

    });

  });

  describe('the "limit" property', () => {

    it('Should be in the query object if it was in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {
        limit: 1
      };

      const queryObject = APIUtils.createQueryByObject(queryObjectParams);

      expect(queryObject).toHaveProperty('limit', 1);

    });

    it('Should not be in the query object if it was not in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {};

      const queryObject = APIUtils.createQueryByObject(queryObjectParams);

      expect(queryObject).toEqual({});

    });

  });

  describe('the "sort" property', () => {

    it('Should be in the query object if it was in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {
        sort: 'asc'
      };

      const queryObject = APIUtils.createQueryByObject(queryObjectParams);

      expect(queryObject).toHaveProperty('sort', 'asc');

    });

    it('Should not be in the query object if it was not in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {};

      const queryObject = APIUtils.createQueryByObject(queryObjectParams);

      expect(queryObject).toEqual({});

    });

  });

  describe('the "page" property', () => {

    it('Should be in the query object if it was in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {
        page: 1
      };

      const queryObject = APIUtils.createQueryByObject(queryObjectParams);

      expect(queryObject).toHaveProperty('page', 1);

    });

    it('Should not be in the query object if it was not in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {};

      const queryObject = APIUtils.createQueryByObject(queryObjectParams);

      expect(queryObject).toEqual({});

    });

  });

  describe('the "skip" property', () => {

    it('Should be in the query object if it was in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {
        skip: 1
      };

      const queryObject = APIUtils.createQueryByObject(queryObjectParams);

      expect(queryObject).toHaveProperty('skip', 1);

    });

    it('Should not be in the query object if it was not in the input object', () => {
      const queryObjectParams: IQueryByObjectParams = {};

      const queryObject = APIUtils.createQueryByObject(queryObjectParams);

      expect(queryObject).toEqual({});

    });

  });

  describe('if all properties was in the input object', () => {

    it('should return an object with all properties passed', () => {
      const queryObjectParams: IQueryByObjectParams = {
        description: 'event 1',
        dayOfWeek: 'friday',
        limit: 1,
        sort: 'asc',
        page: 1,
        skip: 1
      };

      const queryObject = APIUtils.createQueryByObject(queryObjectParams);

      expect(queryObject).toHaveProperty('description', 'event 1');
      expect(queryObject).toHaveProperty('dayOfWeek', 'friday');
      expect(queryObject).toHaveProperty('limit', 1);
      expect(queryObject).toHaveProperty('sort', 'asc');
      expect(queryObject).toHaveProperty('page', 1);
      expect(queryObject).toHaveProperty('skip', 1);
    });
  });
});

describe('Validate if a target is empty/null', () => {

  describe('If target is an array type', () => {

    it('Should return true if target is empty', () => {
      const target: any[] = [];

      const isValid = APIUtils.resultIsEmpty(target);

      expect(isValid).toBeTruthy();
    });

    it('Should return false if target is not empty', () => {
      const target: any[] = ['value'];

      const isValid = APIUtils.resultIsEmpty(target);

      expect(isValid).toBeFalsy();
    });

  });

  describe('If target is an any type', () => {

    it('Should return true if target is undefined', () => {
      let target: any;

      const isValid = APIUtils.resultIsEmpty(target);

      expect(isValid).toBeTruthy();
    });

    it('Should return false if target is defined', () => {
      const target: any = 'value';

      const isValid = APIUtils.resultIsEmpty(target);

      expect(isValid).toBeFalsy();
    });

  });

});