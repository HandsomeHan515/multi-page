import "./scss"

const div = document.createElement('div')
div.setAttribute('id', 'main')
div.innerHTML = 'Hello World!'

document.getElementById('app').appendChild(div)

const arr = [1, 2, 3, 4]

console.log(arr.includes(e => e === 3))

const func = () => {
    console.log(1234)
}