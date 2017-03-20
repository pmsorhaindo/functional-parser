//import { ArrayFunctor, ArrayApplicative, ArrayMonad, Maybe, MaybeFunctor, MaybeApplicative, MaybeMonad } from '../monad';

class ArrayFunctor extends Array {

  fmap (f) {
    return this.map(f);
  }

}


class ArrayApplicative extends ArrayFunctor {

  pure (v) {
    return new ArrayFunctor(v);
  }

  apply (f) {
    return f.fmap(fun => this.map(fun))
      .reduce((a, v) => a.concat(v), new ArrayApplicative());
  }

}

describe('applicative laws', () => {
  const pure = value => new ArrayApplicative(value);
  const id = value => value;

  // pure id <*> v = v
  it('should adhere to the identity law', () => {
    const v = "value";

    //this works in jsbin.
    // no config is needed for babel-jest
    // ...this is weird.
    expect(pure(v).apply(pure(id))).toEqual(pure(v));
  });
});
