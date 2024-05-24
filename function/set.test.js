import mySet from '../function/set'
import { expect, test } from 'vitest'
test('test Set method add and has', () => {
    const set = new mySet()
    set.add(1)
    expect(set.has(1)).toBe(true)
})