import {add, filter, remove} from '../src/set-operations';
import { Batcher } from '../src/batcher';
import { cloneSet, useSetBatcher } from "../src/set-batcher";

xdescribe('SetOperations', () => {
    describe('add', () => {
        describe('1 operation', () => {
            describe('mutable', () => {
                describe('changed', () => {
                    it('changes with mutate: true', () => {
                        const s = new Set<number>([1,2]);
                        let helper = add({target: s, item: 3, mutate: true})
                        expect(helper).toEqual({
                            /* Because was Mutated */
                            initialValue: new Set([1, 2, 3]),
                            mutateInitial: true,
                            cloneFn: cloneSet,
                            /* Because added 3 */
                            hasChanged: true,
                            /* Because Mutated */
                            currentValue: new Set([1, 2, 3])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).toBe(s); 
                    })

                    it ('changes with batcher mutate', () => {
                        const s = new Set<number>([1,2]);
                        let batcher = useSetBatcher(s, true);
                        let helper = add({item: 3, batcher})
                        expect(helper).toEqual({
                            /* Because was Mutated */
                            initialValue: new Set([1, 2, 3]),
                            mutateInitial: true,
                            cloneFn: cloneSet,
                            /* Because added 3 */
                            hasChanged: true,
                            /* Because Mutated */
                            currentValue: new Set([1, 2, 3])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).toBe(s); 
                        expect(helper).toBe(batcher);
                    })                    
                })
                describe('unchanged', () => {
                    it ('does not change with mutate: true', () => {
                        const s = new Set<number>([1,2]);
                        let helper = add({target: s, item: 2, mutate: true})
                        expect(helper).toEqual({
                            /* Because did not change */
                            initialValue: new Set([1, 2]),
                            mutateInitial: true,
                            cloneFn: cloneSet,
                            hasChanged: false,
                            /* Because did not change */
                            currentValue: new Set([1, 2])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).toBe(s); 
                    })    
                    
                    it ('does not change with batcher mutate', () => {
                        const s = new Set<number>([1,2]);
                        let batcher = useSetBatcher(s,  true);
                        let helper = add({target: s, item: 2, batcher})
                        expect(helper).toEqual({
                            /* Because did not change */
                            initialValue: new Set([1, 2]),
                            mutateInitial: true,
                            cloneFn: cloneSet,
                            hasChanged: false,
                            /* Because did not change */
                            currentValue: new Set([1, 2])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).toBe(s); 
                        expect(helper).toBe(batcher);
                    })                        
                })
            })

            describe('immutable', () => {
                describe('changed', () => {
                    it('creates new copy with mutate: false (no key)', () => {
                        const s = new Set<number>([1,2]);
                        let helper = add({target: s, item: 3})
                        expect(helper).toEqual({
                            /* Because Immutable */
                            initialValue: new Set([1, 2]),
                            mutateInitial: false,
                            cloneFn: cloneSet,
                            /* Because added 3 */
                            hasChanged: true,
                            /* Because Mutated */
                            currentValue: new Set([1, 2, 3])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).not.toBe(s);                        
                    })

                    it('creates new copy with batcher immutable', () => {
                        const s = new Set<number>([1,2]);
                        const batcher = useSetBatcher(s);
                        let helper = add({target: s, item: 3, batcher})
                        expect(helper).toEqual({
                            /* Because Immutable */
                            initialValue: new Set([1, 2]),
                            mutateInitial: false,
                            cloneFn: cloneSet,
                            /* Because added 3 */
                            hasChanged: true,
                            /* Because Mutated */
                            currentValue: new Set([1, 2, 3])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).not.toBe(s); 
                        expect(helper).toBe(batcher);
                    })
                })

                describe('unchanged', () => {
                    it('does not change with mutate: false (no key)', () => {
                        const s = new Set<number>([1,2]);
                        let helper = add({target: s, item: 2})
                        expect(helper).toEqual({
                            /* Because did not change */
                            initialValue: new Set([1, 2]),
                            mutateInitial: false,
                            cloneFn: cloneSet,
                            /* Because added 3 */
                            hasChanged: false,
                            /* Because did not change */
                            currentValue: new Set([1, 2])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).toBe(s);                           
                    })

                    it('does not change with batcher immutable', () => {
                        const s = new Set<number>([1,2]);
                        let batcher = useSetBatcher(s);
                        let helper = add({target: s, item: 2, batcher})
                        expect(helper).toEqual({
                            /* Because did not change */
                            initialValue: new Set([1, 2]),
                            mutateInitial: false,
                            cloneFn: cloneSet,
                            /* Because added 3 */
                            hasChanged: false,
                            /* Because did not change */
                            currentValue: new Set([1, 2])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).toBe(s);  
                        expect(helper).toBe(batcher);                           
                    })
                })
            })
        })

        describe('2 operations', () => {
            it('mutable changed, changed', () => {
                const s = new Set<number>([1,2]);
                let helper = add({target: s, item: 3, mutate: true})
                expect(helper).toEqual({
                    /* Because was Mutated */
                    initialValue: new Set([1, 2, 3]),
                    mutateInitial: true,
                    cloneFn: cloneSet,
                    /* Because added 3 */
                    hasChanged: true,
                    /* Because Mutated */
                    currentValue: new Set([1, 2, 3])
                })
                /* Reference holds because mutated */
                expect(helper.initialValue).toBe(s);
                expect(helper.currentValue).toBe(s);   
                
                helper = add({batcher: helper, item: 4})
                expect(helper).toEqual({
                    /* Because was Mutated */
                    initialValue: new Set([1, 2, 3, 4]),
                    mutateInitial: true,
                    cloneFn: cloneSet,
                    /* Because added 3 */
                    hasChanged: true,
                    /* Because Mutated */
                    currentValue: new Set([1, 2, 3, 4])
                })
                /* Reference holds because mutated */
                expect(helper.initialValue).toBe(s);
                expect(helper.currentValue).toBe(s);                   
            })

            it('mutable changed, not changed ', () => {
                const s = new Set<number>([1,2]);
                let batcher = useSetBatcher(s, true)

                let helper = add({item: 3, batcher})
                expect(helper).toEqual({
                    /* Because was Mutated */
                    initialValue: new Set([1, 2, 3]),
                    mutateInitial: true,
                    cloneFn: cloneSet,
                    /* Because added 3 */
                    hasChanged: true,
                    /* Because Mutated */
                    currentValue: new Set([1, 2, 3])
                })
                /* Reference holds because mutated */
                expect(helper.initialValue).toBe(s);
                expect(helper.currentValue).toBe(s);   
                expect(helper).toBe(batcher);                 
                
                /* Should not change */
                helper = add({item: 2, batcher})
                expect(helper).toEqual({
                    /* same ref */
                    initialValue: new Set([1, 2, 3]),
                    mutateInitial: true,
                    cloneFn: cloneSet,
                    /* Because added 3 */
                    hasChanged: true,
                    /* same ref */
                    currentValue: new Set([1, 2, 3])
                })
                /* Reference holds because mutated */
                expect(helper.initialValue).toBe(s);
                expect(helper.currentValue).toBe(s);  
                expect(helper).toBe(batcher);                 
            })      
            
            it('mutable not changed, changed', () => {
                const s = new Set<number>([1, 2]);
                const batcher = useSetBatcher(s, true);
                let helper = add({item: 2, batcher})
                expect(helper).toEqual({
                    /* Because not Mutated */
                    initialValue: new Set([1, 2]),
                    mutateInitial: true,
                    cloneFn: cloneSet,
                    hasChanged: false,
                    /* Because not mutated */
                    currentValue: new Set([1, 2])
                })
                /* Reference holds because not mutated */
                expect(helper.initialValue).toBe(s);
                expect(helper.currentValue).toBe(s);   
                
                /* Now we change it */
                helper = add({batcher: helper, item: 4})
                expect(helper).toEqual({
                    /* Because was Mutated */
                    initialValue: new Set([1, 2, 4]),
                    mutateInitial: true,
                    cloneFn: cloneSet,
                    /* Because added 3 */
                    hasChanged: true,
                    /* Because Mutated */
                    currentValue: new Set([1, 2, 4])
                })
                /* Reference holds because mutated */
                expect(helper.initialValue).toBe(s);
                expect(helper.currentValue).toBe(s);                   
            })

            it('mutable not changed, not changed', () => {
                const s = new Set<number>([1, 2]);
                const batcher = useSetBatcher(s, true);
                let helper = add({item: 2, batcher})
                expect(helper).toEqual({
                    /* Because not Mutated */
                    initialValue: new Set([1, 2]),
                    mutateInitial: true,
                    cloneFn: cloneSet,
                    hasChanged: false,
                    /* Because not mutated */
                    currentValue: new Set([1, 2])
                })
                /* Reference holds because not mutated */
                expect(helper.initialValue).toBe(s);
                expect(helper.currentValue).toBe(s);   
                
                /* Don't change it */
                helper = add({batcher: helper, item: 1})
                expect(helper).toEqual({
                    /* Because was Mutated */
                    initialValue: new Set([1, 2]),
                    mutateInitial: true,
                    cloneFn: cloneSet,
                    /* Because added 3 */
                    hasChanged: false,
                    /* Because Mutated */
                    currentValue: new Set([1, 2])
                })
                /* Reference holds because mutated */
                expect(helper.initialValue).toBe(s);
                expect(helper.currentValue).toBe(s);                   
            })            

            it('immutable changed, changed', () => {
                const s = new Set<number>([1, 2]);
                let batcher = useSetBatcher(s);
                let helper = add({batcher, item: 3})
                expect(helper).toEqual({
                    initialValue: new Set([1, 2]),
                    mutateInitial: false,
                    cloneFn: cloneSet,
                    /* Because added 3 */
                    hasChanged: true,
                    /* Because cloned */
                    currentValue: new Set([1, 2, 3])
                })
                expect(helper.initialValue).toBe(s);
                expect(helper.currentValue).not.toBe(s);   
                
                let helper2 = add({batcher: helper, item: 4})
                expect(helper2).toEqual({
                    initialValue: new Set([1, 2]),
                    mutateInitial: false,
                    cloneFn: cloneSet,
                    /* Because added 3 */
                    hasChanged: true,
                    /* Because Mutated */
                    currentValue: new Set([1, 2, 3, 4])
                })
                expect(helper2.initialValue).toBe(s);
                expect(helper2.currentValue).not.toBe(s);
                expect(helper2).toBe(helper);                   
            })

            it('immutable changed, not changed', () => {
                const s = new Set<number>([1, 2]);
                let batcher = useSetBatcher(s);
                let helper = add({batcher, item: 3})
                expect(helper).toEqual({
                    initialValue: new Set([1, 2]),
                    mutateInitial: false,
                    cloneFn: cloneSet,
                    /* Because added 3 */
                    hasChanged: true,
                    /* Because cloned */
                    currentValue: new Set([1, 2, 3])
                })
                expect(helper.initialValue).toBe(s);
                expect(helper.currentValue).not.toBe(s);   
                
                let helper2 = add({batcher: helper, item: 1})
                expect(helper2).toEqual({
                    initialValue: new Set([1, 2]),
                    mutateInitial: false,
                    cloneFn: cloneSet,
                    /* Because added 3 */
                    hasChanged: true,
                    /* Because Mutated */
                    currentValue: new Set([1, 2, 3])
                })
                expect(helper2.initialValue).toBe(s);
                expect(helper2.currentValue).not.toBe(s);
                expect(helper2).toBe(helper);                   
            })        
            
            it('immutable not changed, changed', () => {
                const s = new Set<number>([1, 2]);
                let batcher = useSetBatcher(s);
                let helper = add({batcher, item: 1})
                expect(helper).toEqual({
                    initialValue: new Set([1, 2]),
                    mutateInitial: false,
                    cloneFn: cloneSet,
                    hasChanged: false,
                    /* Because cloned */
                    currentValue: new Set([1, 2])
                })
                expect(helper.initialValue).toBe(s);
                expect(helper.currentValue).toBe(s);   
                
                let helper2 = add({batcher: helper, item: 3})
                expect(helper2).toEqual({
                    initialValue: new Set([1, 2]),
                    mutateInitial: false,
                    cloneFn: cloneSet,
                    /* Because added 3 */
                    hasChanged: true,
                    /* Because Mutated */
                    currentValue: new Set([1, 2, 3])
                })
                expect(helper2.initialValue).toBe(s);
                expect(helper2.currentValue).not.toBe(s);
                expect(helper2).toBe(helper);                   
            })        
            
            it('immutable not changed, not changed', () => {
                const s = new Set<number>([1, 2]);
                let batcher = useSetBatcher(s);
                let helper = add({batcher, item: 1})
                expect(helper).toEqual({
                    initialValue: new Set([1, 2]),
                    mutateInitial: false,
                    cloneFn: cloneSet,
                    hasChanged: false,
                    /* Because cloned */
                    currentValue: new Set([1, 2])
                })
                expect(helper.initialValue).toBe(s);
                expect(helper.currentValue).toBe(s);   
                
                let helper2 = add({batcher: helper, item: 1})
                expect(helper2).toEqual({
                    initialValue: new Set([1, 2]),
                    mutateInitial: false,
                    cloneFn: cloneSet,
                    /* Because added 3 */
                    hasChanged: false,
                    /* Because Mutated */
                    currentValue: new Set([1, 2])
                })
                expect(helper2.initialValue).toBe(s);
                expect(helper2.currentValue).toBe(s);
                expect(helper2).toBe(helper);                   
            })             
        })

        describe('3 operations', () => {
            describe('mutable', () => {
                it('mutable changed, changed, changed', () => {
                    const s = new Set<number>([1,2]);
                    let batcher = useSetBatcher(s, true);
                    let helper = add({batcher, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = add({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = add({batcher: helper, item: 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4, 5])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);                     
                })
    
                it('mutable changed, changed, not changed', () => {
                    const s = new Set<number>([1,2]);
                    let batcher = useSetBatcher(s, true);
                    let helper = add({batcher, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = add({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = add({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);      
                })
    
                it('mutable changed, not changed, changed', () => {
                    const s = new Set<number>([1,2]);
                    let batcher = useSetBatcher(s, true);
                    let helper = add({batcher, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = add({batcher: helper, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = add({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);       
                })
    
                it('mutable changed, not changed, not changed', () => {
                    const s = new Set<number>([1,2]);
                    let batcher = useSetBatcher(s, true);
                    let helper = add({batcher, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = add({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = add({batcher: helper, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                })
    
                it('mutable not changed, changed, changed', () => {
                    const s = new Set<number>([1,2]);
                    let batcher = useSetBatcher(s, true);
                    let helper = add({batcher, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = add({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 4]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = add({batcher: helper, item: 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 4, 5]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 4, 5])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                })
    
                it('mutable not changed, changed, not changed', () => {
                    const s = new Set<number>([1,2]);
                    let batcher = useSetBatcher(s, true);
                    let helper = add({batcher, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = add({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 4]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = add({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 4]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);    
                })
    
                it('mutable not changed, not changed, changed', () => {
                    const s = new Set<number>([1,2]);
                    let batcher = useSetBatcher(s, true);
                    let helper = add({batcher, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = add({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = add({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 4]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);                       
                })
    
                it('mutable not changed, not changed, not changed', () => {
                    const s = new Set<number>([1,2]);
                    let batcher = useSetBatcher(s, true);
                    let helper = add({batcher, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = add({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = add({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                })
            })

            
            describe('immutable', () => {
                it('immutable changed, changed, changed', () => {
                    const s = new Set<number>([1,2]);
                    let batcher = useSetBatcher(s);
                    let helper = add({batcher, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);  
                    
                    let s1 = helper.currentValue;
                    
                    helper = add({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);         
                    expect(helper.currentValue).toBe(s1);
                    
                    helper = add({batcher: helper, item: 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4, 5])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);      
                    expect(helper.currentValue).toBe(s1);

                })
    
                it('immutable changed, changed, not changed', () => {
                    const s = new Set<number>([1, 2]);
                    let batcher = useSetBatcher(s);
                    let helper = add({batcher, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);  
                    
                    let s1 = helper.currentValue;
                    
                    helper = add({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);         
                    expect(helper.currentValue).toBe(s1);
                    
                    helper = add({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);      
                    expect(helper.currentValue).toBe(s1);      
                })
    
                it('immutable changed, not changed, changed', () => {
                    const s = new Set<number>([1,2]);
                    let batcher = useSetBatcher(s);
                    let helper = add({batcher, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);  
                    
                    let s1 = helper.currentValue;
                    
                    helper = add({batcher: helper, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);         
                    expect(helper.currentValue).toBe(s1);
                    
                    helper = add({batcher: helper, item: 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 5])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);      
                    expect(helper.currentValue).toBe(s1);       
                })
    
                it('immutable changed, not changed, not changed', () => {
                    const s = new Set<number>([1,2]);
                    let batcher = useSetBatcher(s);
                    let helper = add({batcher, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);  
                    
                    let s1 = helper.currentValue;
                    
                    helper = add({batcher: helper, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);         
                    expect(helper.currentValue).toBe(s1);
                    
                    helper = add({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);      
                    expect(helper.currentValue).toBe(s1);     
                })
    
                it('immutable not changed, changed, changed', () => {
                    const s = new Set<number>([1, 2]);
                    let batcher = useSetBatcher(s);
                    let helper = add({batcher, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = add({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 4])
                    })
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);     
                    
                    let s1 = helper.currentValue;
                    
                    helper = add({batcher: helper, item: 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 4, 5])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);     
                    expect(helper.currentValue).toBe(s1)
                })
    
                it('immutable not changed, changed, not changed', () => {
                    const s = new Set<number>([1, 2]);
                    let batcher = useSetBatcher(s);
                    let helper = add({batcher, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = add({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 4])
                    })
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);     
                    
                    let s1 = helper.currentValue;
                    
                    helper = add({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);     
                    expect(helper.currentValue).toBe(s1)  
                })
    
                it('immutable not changed, not changed, changed', () => {
                    const s = new Set<number>([1, 2]);
                    let batcher = useSetBatcher(s);
                    let helper = add({batcher, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = add({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                    
                    let s1 = helper.currentValue;
                    
                    helper = add({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);     
                    expect(helper.currentValue).not.toBe(s1);                     
                })
    
                it('immutable not changed, not changed, not changed', () => {
                    const s = new Set<number>([1, 2]);
                    let batcher = useSetBatcher(s);
                    let helper = add({batcher, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = add({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                    
                    let s1 = helper.currentValue;
                    
                    helper = add({batcher: helper, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                    expect(helper.currentValue).toBe(s1);  
                })
            })

        })
    
    })
    
    describe('remove', () => {
        describe('1 operation', () => {
            describe('mutable', () => {
                describe('changed', () => {
                    it('changes with mutate: true', () => {
                        const s = new Set<number>([1, 2, 3]);
                        let helper = remove({target: s, item: 3, mutate: true})
                        expect(helper).toEqual({
                            /* Because was Mutated */
                            initialValue: new Set([1, 2]),
                            mutateInitial: true,
                            cloneFn: cloneSet,
                            /* Because added 3 */
                            hasChanged: true,
                            /* Because Mutated */
                            currentValue: new Set([1, 2])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).toBe(s); 
                    })

                    it ('changes with batcher mutate', () => {
                        const s = new Set<number>([1, 2, 3]);
                        let batcher = useSetBatcher(s, true);
                        let helper = remove({item: 3, batcher})
                        expect(helper).toEqual({
                            /* Because was Mutated */
                            initialValue: new Set([1, 2]),
                            mutateInitial: true,
                            cloneFn: cloneSet,
                            /* Because added 3 */
                            hasChanged: true,
                            /* Because Mutated */
                            currentValue: new Set([1, 2])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).toBe(s); 
                        expect(helper).toBe(batcher);
                    })                    
                })
                describe('unchanged', () => {
                    it ('does not change with mutate: true', () => {
                        const s = new Set<number>([1, 2]);
                        let helper = remove({target: s, item: 3, mutate: true})
                        expect(helper).toEqual({
                            /* Because did not change */
                            initialValue: new Set([1, 2]),
                            mutateInitial: true,
                            cloneFn: cloneSet,
                            hasChanged: false,
                            /* Because did not change */
                            currentValue: new Set([1, 2])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).toBe(s); 
                    })    
                    
                    it ('does not change with batcher mutate', () => {
                        const s = new Set<number>([1, 2]);
                        let batcher = useSetBatcher(s,  true);
                        let helper = remove({target: s, item: 3, batcher})
                        expect(helper).toEqual({
                            /* Because did not change */
                            initialValue: new Set([1, 2]),
                            mutateInitial: true,
                            cloneFn: cloneSet,
                            hasChanged: false,
                            /* Because did not change */
                            currentValue: new Set([1, 2])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).toBe(s); 
                        expect(helper).toBe(batcher);
                    })                        
                })
            })

            describe('immutable', () => {
                describe('changed', () => {
                    it('creates new copy with mutate: false (no key)', () => {
                        const s = new Set<number>([1,2]);
                        let helper = remove({target: s, item: 2})
                        expect(helper).toEqual({
                            /* Because Immutable */
                            initialValue: new Set([1, 2]),
                            mutateInitial: false,
                            cloneFn: cloneSet,
                            /* Because added 3 */
                            hasChanged: true,
                            /* Because Mutated */
                            currentValue: new Set([1])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).not.toBe(s);                        
                    })

                    it('creates new copy with batcher immutable', () => {
                        const s = new Set<number>([1,2]);
                        const batcher = useSetBatcher(s);
                        let helper = remove({target: s, item: 2, batcher})
                        expect(helper).toEqual({
                            /* Because Immutable */
                            initialValue: new Set([1, 2]),
                            mutateInitial: false,
                            cloneFn: cloneSet,
                            /* Because added 3 */
                            hasChanged: true,
                            /* Because Mutated */
                            currentValue: new Set([1])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).not.toBe(s); 
                        expect(helper).toBe(batcher);
                    })
                })

                describe('unchanged', () => {
                    it('does not change with mutate: false (no key)', () => {
                        const s = new Set<number>([1, 2]);
                        let helper = remove({target: s, item: 3})
                        expect(helper).toEqual({
                            /* Because did not change */
                            initialValue: new Set([1, 2]),
                            mutateInitial: false,
                            cloneFn: cloneSet,
                            /* Because added 3 */
                            hasChanged: false,
                            /* Because did not change */
                            currentValue: new Set([1, 2])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).toBe(s);                           
                    })

                    it('does not change with batcher immutable', () => {
                        const s = new Set<number>([1, 2]);
                        let batcher = useSetBatcher(s);
                        let helper = remove({target: s, item: 3, batcher})
                        expect(helper).toEqual({
                            /* Because did not change */
                            initialValue: new Set([1, 2]),
                            mutateInitial: false,
                            cloneFn: cloneSet,
                            /* Because added 3 */
                            hasChanged: false,
                            /* Because did not change */
                            currentValue: new Set([1, 2])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).toBe(s);  
                        expect(helper).toBe(batcher);                           
                    })
                })
            })
        
        })

        describe('3 operations', () => {
            describe('mutable', () => {
                it('mutable changed, changed, changed', () => {
                    const s = new Set<number>([1, 2, 3]);
                    let batcher = useSetBatcher(s, true);
                    let helper = remove({batcher, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = remove({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = remove({batcher: helper, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);                     
                })
    
                it('mutable changed, changed, not changed', () => {
                    const s = new Set<number>([1, 2, 3]);
                    let batcher = useSetBatcher(s, true);
                    let helper = remove({batcher, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = remove({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = remove({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);      
                })
    
                it('mutable changed, not changed, changed', () => {
                    const s = new Set<number>([1,2, 3]);
                    let batcher = useSetBatcher(s, true);
                    let helper = remove({batcher, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = remove({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = remove({batcher: helper, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);       
                })
    
                it('mutable changed, not changed, not changed', () => {
                    const s = new Set<number>([1, 2]);
                    let batcher = useSetBatcher(s, true);
                    let helper = remove({batcher, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = remove({batcher: helper, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = remove({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                })
    
                it('mutable not changed, changed, changed', () => {
                    const s = new Set<number>([1, 2]);
                    let batcher = useSetBatcher(s, true);
                    let helper = remove({batcher, item: 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = remove({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = remove({batcher: helper, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                })
    
                it('mutable not changed, changed, not changed', () => {
                    const s = new Set<number>([1,2]);
                    let batcher = useSetBatcher(s, true);
                    let helper = remove({batcher, item: 6})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = remove({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = remove({batcher: helper, item: 7})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);    
                })
    
                it('mutable not changed, not changed, changed', () => {
                    const s = new Set<number>([1,2]);
                    let batcher = useSetBatcher(s, true);
                    let helper = remove({batcher, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = remove({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = remove({batcher: helper, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);                       
                })
    
                it('mutable not changed, not changed, not changed', () => {
                    const s = new Set<number>([1,2]);
                    let batcher = useSetBatcher(s, true);
                    let helper = remove({batcher, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = remove({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = remove({batcher: helper, item: 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                })
            })

            
            describe('immutable', () => {
                it('immutable changed, changed, changed', () => {
                    const s = new Set<number>([1, 2, 3]);
                    let batcher = useSetBatcher(s);
                    let helper = remove({batcher, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);  
                    
                    let s1 = helper.currentValue;
                    
                    helper = remove({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);         
                    expect(helper.currentValue).toBe(s1);
                    
                    helper = remove({batcher: helper, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);      
                    expect(helper.currentValue).toBe(s1);

                })
    
                it('immutable changed, changed, not changed', () => {
                    const s = new Set<number>([1, 2, 3]);
                    let batcher = useSetBatcher(s);
                    let helper = remove({batcher, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);  
                    
                    let s1 = helper.currentValue;
                    
                    helper = remove({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);         
                    expect(helper.currentValue).toBe(s1);
                    
                    helper = remove({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);      
                    expect(helper.currentValue).toBe(s1);      
                })
    
                it('immutable changed, not changed, changed', () => {
                    const s = new Set<number>([1, 2]);
                    let batcher = useSetBatcher(s);
                    let helper = remove({batcher, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);  
                    
                    let s1 = helper.currentValue;
                    
                    helper = remove({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);         
                    expect(helper.currentValue).toBe(s1);
                    
                    helper = remove({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);      
                    expect(helper.currentValue).toBe(s1);       
                })
    
                it('immutable changed, not changed, not changed', () => {
                    const s = new Set<number>([1,2]);
                    let batcher = useSetBatcher(s);
                    let helper = remove({batcher, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);  
                    
                    let s1 = helper.currentValue;
                    
                    helper = remove({batcher: helper, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);         
                    expect(helper.currentValue).toBe(s1);
                    
                    helper = remove({batcher: helper, item: 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);      
                    expect(helper.currentValue).toBe(s1);     
                })
    
                it('immutable not changed, changed, changed', () => {
                    const s = new Set<number>([1, 2]);
                    let batcher = useSetBatcher(s);
                    let helper = remove({batcher, item: 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = remove({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);     
                    
                    let s1 = helper.currentValue;
                    
                    helper = remove({batcher: helper, item: 1})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);     
                    expect(helper.currentValue).toBe(s1)
                })
    
                it('immutable not changed, changed, not changed', () => {
                    const s = new Set<number>([1, 2]);
                    let batcher = useSetBatcher(s);
                    let helper = remove({batcher, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = remove({batcher: helper, item: 1})
                    expect(helper).toEqual({
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([2])
                    })
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);     
                    
                    let s1 = helper.currentValue;
                    
                    helper = remove({batcher: helper, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);     
                    expect(helper.currentValue).toBe(s1)  
                })
    
                it('immutable not changed, not changed, changed', () => {
                    const s = new Set<number>([1, 2]);
                    let batcher = useSetBatcher(s);
                    let helper = remove({batcher, item: 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = remove({batcher: helper, item: 5})
                    expect(helper).toEqual({
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                    
                    let s1 = helper.currentValue;
                    
                    helper = remove({batcher: helper, item: 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);     
                    expect(helper.currentValue).not.toBe(s1);                     
                })
    
                it('immutable not changed, not changed, not changed', () => {
                    const s = new Set<number>([1, 2, 3]);
                    let batcher = useSetBatcher(s);
                    let helper = remove({batcher, item: 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = remove({batcher: helper, item: 5})
                    expect(helper).toEqual({
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                    
                    let s1 = helper.currentValue;
                    
                    helper = remove({batcher: helper, item: 6})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                    expect(helper.currentValue).toBe(s1);  
                })
            })

        })
    

    })

    describe('filter', () => {
        describe('1 operation', () => {
            describe('mutable', () => {
                describe('changed', () => {
                    it('changes with mutate: true', () => {
                        const s = new Set<number>([1, 2, 3, 4, 5]);
                        let helper = filter({target: s, fn: (i) => i < 4, mutate: true})
                        expect(helper).toEqual({
                            /* Because was Mutated */
                            initialValue: new Set([1, 2, 3]),
                            mutateInitial: true,
                            cloneFn: cloneSet,
                            /* Because added 3 */
                            hasChanged: true,
                            /* Because Mutated */
                            currentValue: new Set([1, 2, 3])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).toBe(s);                         
                    })

                    it ('changes with batcher mutate', () => {
                        const s = new Set<number>([1, 2, 3, 4, 5]);
                        let batcher = useSetBatcher(s, true);
                        let helper = filter({batcher, fn: (i) => i < 4 })
                        expect(helper).toEqual({
                            /* Because was Mutated */
                            initialValue: new Set([1, 2, 3]),
                            mutateInitial: true,
                            cloneFn: cloneSet,
                            /* Because added 3 */
                            hasChanged: true,
                            /* Because Mutated */
                            currentValue: new Set([1, 2, 3])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).toBe(s); 
                        expect(helper).toBe(batcher);
                    })                         
                })

                describe('unchanged', () => {
                    it ('does not change with mutate: true', () => {
                        const s = new Set<number>([1, 2, 3, 4, 5]);
                        let helper = filter({target: s, fn: (i) => i < 10, mutate: true})
                        expect(helper).toEqual({
                            /* Because did not change */
                            initialValue: new Set([1, 2, 3, 4, 5]),
                            mutateInitial: true,
                            cloneFn: cloneSet,
                            hasChanged: false,
                            /* Because did not change */
                            currentValue: new Set([1, 2, 3, 4, 5])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).toBe(s); 
                    })   

                    it ('does not change with batcher mutate', () => {
                        const s = new Set<number>([1, 2, 3, 4, 5]);
                        let batcher = useSetBatcher(s,  true);
                        let helper = filter({target: s, fn: i => i < 10, batcher})
                        expect(helper).toEqual({
                            /* Because did not change */
                            initialValue: new Set([1, 2, 3, 4, 5]),
                            mutateInitial: true,
                            cloneFn: cloneSet,
                            hasChanged: false,
                            /* Because did not change */
                            currentValue: new Set([1, 2, 3, 4, 5])
                        })
                        /* Reference holds because mutated */
                        expect(helper.initialValue).toBe(s);
                        expect(helper.currentValue).toBe(s); 
                        expect(helper).toBe(batcher);
                    })                          
                })                
            })            
        })
    
        describe('3 operations', () => {
            describe('mutable', () => {
                it('mutable changed, changed, changed', () => {
                    const s = new Set<number>([1, 2, 3, 4]);
                    let batcher = useSetBatcher(s, true);
                    let helper = filter({batcher, fn: i => i < 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = filter({batcher: helper, fn: i => i < 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = filter({batcher: helper, fn: i => i < 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);                     
                })
    
                it('mutable changed, changed, not changed', () => {
                    const s = new Set<number>([1, 2, 3, 4]);
                    let batcher = useSetBatcher(s, true);
                    let helper = filter({batcher, fn: i => i < 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = filter({batcher, fn: i => i < 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = filter({batcher, fn: i => i < 10})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);      
                })
    
                it('mutable changed, not changed, changed', () => {
                    const s = new Set<number>([1, 2, 3, 4]);
                    let batcher = useSetBatcher(s, true);
                    let helper = filter({batcher, fn: (i) => i < 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = filter({batcher: helper, fn: i => i < 10})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = filter({batcher: helper, fn: i => i < 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);       
                })
    
                it('mutable changed, not changed, not changed', () => {
                    const s = new Set<number>([1, 2, 3, 4, 5]);
                    let batcher = useSetBatcher(s, true);
                    let helper = filter({batcher, fn: i => i < 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = filter({batcher: helper, fn: i => i < 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = filter({batcher: helper, fn: i => i < 6})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                })
    
                it('mutable not changed, changed, changed', () => {
                    const s = new Set<number>([1, 2, 3, 4, 5]);
                    let batcher = useSetBatcher(s, true);
                    let helper = filter({batcher, fn: i => i < 6})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4, 5])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = filter({batcher, fn: i => i < 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = filter({batcher, fn: i => i < 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                })
    
                it('mutable not changed, changed, not changed', () => {
                    const s = new Set<number>([1, 2]);
                    let batcher = useSetBatcher(s, true);
                    let helper = filter({batcher, fn: i => i < 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = filter({batcher, fn: i => i < 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = filter({batcher, fn: i => i < 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);    
                })
    
                it('mutable not changed, not changed, changed', () => {
                    const s = new Set<number>([1, 2]);
                    let batcher = useSetBatcher(s, true);
                    let helper = filter({batcher, fn: i => i < 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = filter({batcher, fn: i => i < 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = filter({batcher, fn: i => i < 2})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);                       
                })
    
                it('mutable not changed, not changed, not changed', () => {
                    const s = new Set<number>([1, 2]);
                    let batcher = useSetBatcher(s, true);
                    let helper = filter({batcher, fn: i => i < 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = filter({batcher, fn: i => i < 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);         
                    
                    helper = filter({batcher, fn: i => i < 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2]),
                        mutateInitial: true,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                })
            })

            
            describe('immutable', () => {
                it('immutable changed, changed, changed', () => {
                    const s = new Set<number>([1, 2, 3, 4, 5]);
                    let batcher = useSetBatcher(s);
                    let helper = filter({batcher, fn: i => i < 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);  
                    
                    let s1 = helper.currentValue;
                    
                    helper = filter({batcher, fn: i => i < 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);         
                    expect(helper.currentValue).toBe(s1);
                    
                    helper = filter({batcher, fn: i => i < 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);      
                    expect(helper.currentValue).toBe(s1);

                })
    
                it('immutable changed, changed, not changed', () => {
                    const s = new Set<number>([1, 2, 3, 4, 5]);
                    let batcher = useSetBatcher(s);
                    let helper = filter({batcher, fn: i => i < 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);  
                    
                    let s1 = helper.currentValue;
                    
                    helper = filter({batcher, fn: i => i < 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);         
                    expect(helper.currentValue).toBe(s1);
                    
                    helper = filter({batcher, fn: i => i < 7})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);      
                    expect(helper.currentValue).toBe(s1);      
                })
    
                it('immutable changed, not changed, changed', () => {
                    const s = new Set<number>([1, 2, 3, 4, 5]);
                    let batcher = useSetBatcher(s);
                    let helper = filter({batcher, fn: i => i < 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);  
                    
                    let s1 = helper.currentValue;
                    
                    helper = filter({batcher, fn: i => i < 8})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);         
                    expect(helper.currentValue).toBe(s1);
                    
                    helper = filter({batcher, fn: i => i < 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);      
                    expect(helper.currentValue).toBe(s1);       
                })
    
                it('immutable changed, not changed, not changed', () => {
                    const s = new Set<number>([1, 2, 3, 4, 5]);
                    let batcher = useSetBatcher(s);
                    let helper = filter({batcher, fn: i => i < 5})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);  
                    
                    let s1 = helper.currentValue;
                    
                    helper = filter({batcher, fn: i => i < 7})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);         
                    expect(helper.currentValue).toBe(s1);
                    
                    helper = filter({batcher, fn: i => i < 9})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);      
                    expect(helper.currentValue).toBe(s1);     
                })
    
                it('immutable not changed, changed, changed', () => {
                    const s = new Set<number>([1, 2, 3, 4, 5]);
                    let batcher = useSetBatcher(s);
                    let helper = filter({batcher, fn: i => i < 7})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4, 5])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = filter({batcher, fn: i => i < 5})
                    expect(helper).toEqual({
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4])
                    })
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);     
                    
                    let s1 = helper.currentValue;
                    
                    helper = filter({batcher, fn: i => i < 3})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);     
                    expect(helper.currentValue).toBe(s1)
                })
    
                it('immutable not changed, changed, not changed', () => {
                    const s = new Set<number>([1, 2, 3, 4, 5]);
                    let batcher = useSetBatcher(s);
                    let helper = filter({batcher, fn: i => i < 6})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4, 5])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = filter({batcher, fn: i => i < 4})
                    expect(helper).toEqual({
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);     
                    
                    let s1 = helper.currentValue;
                    
                    helper = filter({batcher, fn: i => i < 7})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);     
                    expect(helper.currentValue).toBe(s1)  
                })
    
                it('immutable not changed, not changed, changed', () => {
                    const s = new Set<number>([1, 2, 3, 4, 5]);
                    let batcher = useSetBatcher(s);
                    let helper = filter({batcher, fn: i => i < 7})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4, 5])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = filter({batcher, fn: i => i < 6})
                    expect(helper).toEqual({
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4, 5])
                    })
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                    
                    let s1 = helper.currentValue;
                    
                    helper = filter({batcher, fn: i => i < 4})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: true,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).not.toBe(s);     
                    expect(helper.currentValue).not.toBe(s1);                     
                })
    
                it('immutable not changed, not changed, not changed', () => {
                    const s = new Set<number>([1, 2, 3, 4, 5]);
                    let batcher = useSetBatcher(s);
                    let helper = filter({batcher, fn: i => i < 8})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4, 5])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);   
                    
                    helper = filter({batcher, fn: i => i < 6})
                    expect(helper).toEqual({
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4, 5])
                    })
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                    
                    let s1 = helper.currentValue;
                    
                    helper = filter({batcher, fn: i => i < 7})
                    expect(helper).toEqual({
                        /* Because was Mutated */
                        initialValue: new Set([1, 2, 3, 4, 5]),
                        mutateInitial: false,
                        cloneFn: cloneSet,
                        /* Because added 3 */
                        hasChanged: false,
                        /* Because Mutated */
                        currentValue: new Set([1, 2, 3, 4, 5])
                    })
                    /* Reference holds because mutated */
                    expect(helper.initialValue).toBe(s);
                    expect(helper.currentValue).toBe(s);     
                    expect(helper.currentValue).toBe(s1);  
                })
            })

        })
        
    
    })
})