import { ArrayFunctor, ArrayApplicative, ArrayMonad, Maybe, MaybeFunctor, MaybeApplicative, MaybeMonad } from '../monad';

describe('applicative laws', () => {
  const pure = value => new ArrayApplicative(value);
  const id = value => value;

  // pure id <*> v = v
  it('should adhere to the identity law', () => {
    const v = "value";

    expect(pure(v).apply(pure(id))).toEqual(pure(v));
  });
});
