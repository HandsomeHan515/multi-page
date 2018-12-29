import { remove } from '@/utils/'
import { cloneDeep } from 'lodash-es'

let arr = [1,2,3,4]

let newArr = remove(arr, 3)
console.log('new arr', newArr)

let cloneArr = cloneDeep(arr)
console.log('clone arr', cloneArr)