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

// A maybe is a functor that applies the function to the held value if it is present
// A maybe is a holder for zero or one value of type T.

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

// An applicative of type T holds values of type T and provides apply which takes another applicative holding a function of type (T -> U)
// In this I will assume that the two applicatives are of the same type (i.e. ArrayApplicative applied to an ArrayApplicative, etc)
// If I can generalize this then that would be good.

class ArrayApplicative extends ArrayFunctor {

    apply (f) {
        return f.fmap(fun => this.map(fun));
    }

}
