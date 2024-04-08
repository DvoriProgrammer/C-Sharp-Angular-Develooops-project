
import { Question } from "./question.model"
export class Category {
    id!: number
    text!:string
    questions: Question[] = [];
}
