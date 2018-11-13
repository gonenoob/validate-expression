# validate-expression
[![Build Status](https://travis-ci.org/gonenoob/validate-expression.svg?branch=master)](https://travis-ci.org/gonenoob/validate-expression)

## Install

```sh
$ npm install --save validate-expression
```

## Usage

```js
const { validateExpression } = require('validate-expression')
```

## Example

```js
const { validateExpression } = require('validate-expression')
let expression1 = '1&&2&3|4||5 & !(6|7)'
let expression1 = '1&&2&3|4||5! & !(6|7)'
let ret1 = validateExpression(expression1) //true
let ret2 = validateExpression(expression1, 8) //false
let ret3 = validateExpression(expression2) //false
```