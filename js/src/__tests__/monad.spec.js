//jest.unmock('ArrayFunctor');
//jest.unmock('ArrayApplicative');
//jest.unmock('ArrayMonad');
import { ArrayFunctor, ArrayApplicative, ArrayMonad, Maybe, MaybeFunctor, MaybeApplicative, MaybeMonad } from '../monad';

describe('applicative laws', () => {
  const pure = value => new ArrayApplicative(value);
  const id = value => value;
  const v = "value";

  // pure id <*> v = v
  it('should adhere to the identity law', () => {

    //this works in jsbin.
    // no config is needed for babel-jest
    // ...this is weird.
    let x = new ArrayApplicative(v);
    console.log('1', x.constructor.name);
    console.log('2', pure(id).fmap([]));
    console.log(pure(v),pure(v).constructor.name);

    expect(pure(v).apply(pure(id))).toEqual(pure(v));
  });
});
