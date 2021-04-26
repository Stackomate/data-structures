type VoidFn<A> = (a: A) => void;
const tap = <A>(fn: VoidFn<A>) => (a: A): A => {
    fn(a);
    return a;
};
