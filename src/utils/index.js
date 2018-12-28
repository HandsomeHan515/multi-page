export function remove(arr, item) {
    if (arr.length && arr.indexOf(item) > -1) {
        return arr.splice(index, 1)
    }
}

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: null,
    set: null
}

function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

function Data() {
    this.data = {
        a: 1,
        b: 2
    }

    for(let key in this.data) {
        proxy(this, 'data', key)
    }
}

let data = new Data()
console.log(data.a , data.b) // 1 2

data.a = 10
data.b = 20
console.log(data.a , data.b) // 10 20

let a = {
    value: 'han'
}

function person(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value)
}

person.call(a, 'han', 23) // han 23 handsome
person.apply(a, ['han', 23]) // han 23 handsome

let list = []
Array.apply(null, { length: 3 }).map((item, page) => {
    page = page + 1
    list.push({ code: page, name: `第${page}页` })
})

Function.prototype.myCall = function(context) {
    if (typeof this !== 'function') throw new Error('Error')
    context = context || window
    context.fn = this
    let args = [...arguments].slice(1)
    let result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.MyApply = function (context) { 
    if (typeof this !== 'function') throw new TypeError('Error')
    context = context || window
    context.fn = this
    let result
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}

function dataType(obj) {
    const str = Object.prototype.toString.call(obj)
    return /^\[object (.*)\]$/.exec(str)[1].toLowerCase()
}

function isType(obj, type) {
    return Object.prototype.toString.call(obj) === ('[object ' + type + ']')
}

function isString(obj) {
    return isType(obj, 'String')
}

function isArray(obj) {
    return isType(obj, 'Array')
}

function isObject(obj) {
    return isType(obj, 'Object')
}

function isFunction(obj) {
    return isType(obj, 'Function')
}

function isBoolean(obj) {
    return isType(obj, 'Boolean')
}

function isNumber(obj) {
    return isType(obj, 'Number')
}

function isUndefined(obj) {
    return isType(obj, 'Undefined')
}

function isNull(obj) {
    return isType(obj, 'Null')
}

function isDate(obj) {
    return isType(obj, 'Date')
}

function isRegExp(obj) {
    return isType(obj, 'RegExp')
}

function isMath(obj) {
    return isType(obj, 'Math')
}