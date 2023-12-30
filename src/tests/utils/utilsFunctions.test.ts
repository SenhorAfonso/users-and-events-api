import createQueryById from "../../app/utils/createQueryById"
import IQueryByIdParams from "../../interfaces/Events/IQueryByIdParams"

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