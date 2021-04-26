import { Batcher } from "./batcher";

export type Fn<A, B> = (a: A) => B;

/* Must edit batch function inside batcher too */
interface Batch {
    <Z, A>(a: Batcher<Z>, f1: (a: Batcher<Z>) => A): A;
    <Z, A, B>(a: Batcher<Z>, f1: (a: Batcher<Z>) => A, f2: Fn<A, B>): B;
    <Z, A, B, C>(a: Batcher<Z>, f1: (a: Batcher<Z>) => A, f2: Fn<A, B>, f3: Fn<B, C>): C;
    <Z, A, B, C, D>(a: Batcher<Z>, f1: (a: Batcher<Z>) => A, f2: Fn<A, B>, f3: Fn<B, C>, f4: Fn<C, D>): D;
    <Z, A, B, C, D, E>(a: Batcher<Z>, f1: (a: Batcher<Z>) => A, f2: Fn<A, B>, f3: Fn<B, C>, f4: Fn<C, D>, f5: Fn<D, E>): E;
    <Z, A, B, C, D, E, F>(a: Batcher<Z>, f1: (a: Batcher<Z>) => A, f2: Fn<A, B>, f3: Fn<B, C>, f4: Fn<C, D>, f5: Fn<D, E>, f6: Fn<E, F>): F;    
    <Z>(a: Batcher<Z>) : Batcher<Z>
    <Q>(...args: any) : Q
}

export const batch: Batch = (b: any, ...ops: any) => {
    let lastResult = b;
    for (let op of ops) {
        lastResult = op(lastResult);
    }
    return lastResult;
};
