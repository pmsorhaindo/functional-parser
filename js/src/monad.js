// A monad is a way to handle execution of functions over values
// In haskell a monad extends an applicative. An applicative extends a functor.

// A functor of type T holds values of type T and provides fmap which is a function of (T -> U)

// An array is a functor that applies the function to all elements of the array
// An array is a holder for zero or more values of type T.

class ArrayFunctor extends Array {

  fmap (f) {
    return this.map(f);
  }

}

// af = new ArrayFunctor(1, 2, 3)
// af.apply(a => a + 1)
// ➜ [ 2, 3, 4 ]

// A maybe is a functor that applies the function to the held value if it is present
// A maybe is a holder for zero or one value of type T.

class Maybe {

  constructor(value) {
    this.value = value;
  }

  isPresent() {
    return this.value !== undefined
        && this.value !== null;
  }

}

class MaybeFunctor extends Maybe {

  fmap (f) {
    if (this.isPresent()) {
      return new Maybe(f(this.value));
    }
    return this;
  }

}

// mf = new MaybeFunctor(1)
// mf.apply(a => a * 3)
// ➜ { 3 }

// An applicative of type T holds values of type T and provides apply which takes another applicative holding a function of type (T -> U)
// In this I will assume that the two applicatives are of the same type (i.e. ArrayApplicative applied to an ArrayApplicative, etc)
// If I can generalize this then that would be good.
// I don't think it's generalizable.
// What would be the return type of applying an array of functions to a maybe? How does that compare to applying a maybe function to an array?
// Since those two cannot be consistent in return type with each other, avoid layering AND return all values I think it is impossible.

class ArrayApplicative extends ArrayFunctor {

  pure (v) {
    return new ArrayApplicative(v);
  }

  apply (f) {
    return f.fmap(fun => this.map(fun))
            .reduce((a, v) => a.concat(v));
  }

}

// aa = new ArrayApplicative(1, 2, 3)
// af = new ArrayApplicative(a => a + 1, a => a * 2)
// aa.apply(af)
// ➜ [ 2, 3, 4, 2, 4, 6 ]

class MaybeApplicative extends MaybeFunctor {

  pure (v) {
    return new this.constructor(v);
  }

  apply (f) {
    return f.fmap(fun => this.fmap(fun))
            .value;
  }

}

// ma = new MaybeApplicative(1)
// mf = new MaybeApplicative(a => a * 3)
// ma.apply(mf)
// ➜ { 3 }

// A monad of type T holds values of type T and provides bind which takes a function of type (T -> monad U)
// Javascript is unlikely to care if the monad in the return is the same type, however most monads will naturally have that restriction.
// This is because the value returned by the bind method may not be the one returned by the function.

class ArrayMonad extends ArrayApplicative {

  return (v) {
    return new this.constructor(v);
  }

  bind (f) {
    return this.fmap(f)
               .reduce((a, v) => a.concat(v));
  }

}

// am = new ArrayMonad(1, 2, 3)
// aa.apply(a => [a, a * 2])
// ➜ [ 1, 2, 2, 4, 3, 6 ]

class MaybeMonad extends MaybeApplicative {

  return (v) {
    return new this.constructor(v);
  }

  bind (f) {
    return this.fmap(f)
               .value;
  }

}

// mm = new MaybeMonad(1)
// mm.bind(a => new MaybeMonad(a * 3))
// ➜ { 3 }

export { ArrayFunctor, ArrayApplicative, ArrayMonad, Maybe, MaybeFunctor, MaybeApplicative, MaybeMonad };
