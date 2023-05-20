export interface IUserCreateBody {   
  name: string,
  surname: string,
  email: string;
  password: string;
  user_type_id?: number
}