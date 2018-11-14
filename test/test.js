const { validateExpression: VE } = require('validate-expression')

test('"1" should be true', () => {
  let v = VE('1')
  expect(v).toBe(true)
})

test('"!1" should be true', () => {
  let v = VE('!1')
  expect(v).toBe(true)
})

test('"a" should be false', () => {
  let v = VE('a')
  expect(v).toBe(false)
})

test('"!a" should be false', () => {
  let v = VE('!a')
  expect(v).toBe(false)
})

test('"1&" should be false', () => {
  let v = VE('1&')
  expect(v).toBe(false)
})

test('"1&a" should be false', () => {
  let v = VE('1&a')
  expect(v).toBe(false)
})

test('"1&2" should be true', () => {
  let v = VE('1&2')
  expect(v).toBe(true)
})

test('"1&2|3" should be true', () => {
  let v = VE('1&2|3')
  expect(v).toBe(true)
})

test('"1& 2|  3" should be true', () => {
  let v = VE('1& 2|  3')
  expect(v).toBe(true)
})

test('"!1& 2|  !3" should be true', () => {
  let v = VE('!1& 2|  !3')
  expect(v).toBe(true)
})

test('"!!1& 2|  !!!3" should be true', () => {
  let v = VE('!!1& 2|  !!!3')
  expect(v).toBe(true)
})

test('"(1&2)|3" should be true', () => {
  let v = VE('(1&2)|3')
  expect(v).toBe(true)
})

test('"(1)&2|3" should be true', () => {
  let v = VE('(1)&2|3')
  expect(v).toBe(true)
})

test('"(1)&2|(3" should be false', () => {
  let v = VE('(1)&2|(3')
  expect(v).toBe(false)
})

test('"(1)&2|3)" should be false', () => {
  let v = VE('(1)&2|3)')
  expect(v).toBe(false)
})

test('"(1)&2|(3)" should be true', () => {
  let v = VE('(1)&2|(3)')
  expect(v).toBe(true)
})

test('"(1&)2|3" should be false', () => {
  let v = VE('(1&)2|3')
  expect(v).toBe(false)
})

test('"(1)&2|3" should be true', () => {
  let v = VE('(1)&2|3')
  expect(v).toBe(true)
})

test('"!(1)&2|3" should be true', () => {
  let v = VE('!(1)&2|3')
  expect(v).toBe(true)
})

test('"!(1&2)|3" should be true', () => {
  let v = VE('!(1&2)|3')
  expect(v).toBe(true)
})

test('"!(!(!1)&2)|3" should be true', () => {
  let v = VE('!(!(!1)&2)|3')
  expect(v).toBe(true)
})

test('"(!(!(!1)&2)|3" should be false', () => {
  let v = VE('(!(!(!1)&2)|3')
  expect(v).toBe(false)
})

test('"!(!(!1)&2)|3|4" and [1,2,3,4] should be true', () => {
  let v = VE('!(!(!1)&2)|3|4', [1,2,3,4])
  expect(v).toBe(true)
})

test('"!(!(!1)&2)|3|4" and [1,2,4] should be false', () => {
  let v = VE('!(!(!1)&2)|3|4', [1,2,4])
  expect(v).toBe(false)
})