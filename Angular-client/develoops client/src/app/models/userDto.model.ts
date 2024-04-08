import { Question } from './question.model'
import { Answer } from './answer.model';
export class UserDto {
  id?: number;
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  phoneNumber?: string;
  email!: string;
  fileImage?: string;
  img?: string;
  role!: string;
  //questions: Question[] = [];
  answers: Answer[] = [];
}