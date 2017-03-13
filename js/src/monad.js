// A monad is a way to handle execution of functions over values
// In haskell a monad extends an applicative. An applicative extends a functor.

// A functor of type T holds values of type T and provides fmap which is a function of (T -> U)

// An array is a functor that applies the function to all elements of the array

class ArrayFunctor extends Array {

    fmap (f) {
        return this.map(f);
    }

}

// A maybe is a functor that applies the function to the held value if it is present

class Maybe {

    constructor(value) {
        this.value = value;
    }

    isPresent() {
        return this.value !== undefined && this.value !== null;
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

