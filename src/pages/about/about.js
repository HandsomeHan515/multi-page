import _ from 'lodash'
import './about.scss'
import Apple from './apple.png'

const el = document.createElement('div')
el.innerHTML = _.join(['Hello', 'webpack'], ' ')
el.classList.add('name')
const apple = new Image()
apple.src = Apple
apple.classList.add('inner')
el.appendChild(apple)
document.body.appendChild(el)