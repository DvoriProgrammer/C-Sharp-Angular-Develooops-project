import { Answer } from "./answer.model"
import { UserDto } from "./userDto.model"
import { Category } from "./category.model"
export class Question {
    id?: number;
    title: string = ""
    date!: Date;
    content: string = ""
    answers:Answer[]=[];
    user?: UserDto;
    userId!: number
    categoryId!: number;
    img?: string;
    FileImage?: string;
}
