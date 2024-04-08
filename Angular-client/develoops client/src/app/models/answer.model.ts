import {UserDto} from './userDto.model'
import { Question } from './question.model'
export class Answer{
 id?:number
 date?:Date
 score!:number
 userId!: number
 user?:UserDto
 questionId!:number
 content!:string
 title!:string
}