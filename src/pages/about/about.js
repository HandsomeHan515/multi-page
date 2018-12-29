import { join } from 'lodash-es'
import './about.scss'
import Apple from './apple.png'

const el = document.createElement('div')
el.innerHTML = join(['Hello', 'webpack'], ' ')
el.classList.add('name')
const apple = new Image()
apple.src = Apple
apple.classList.add('inner')
el.appendChild(apple)
document.body.appendChild(el)