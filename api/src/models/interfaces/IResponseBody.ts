export interface IResponseBodyWithData {   
  type: boolean;
  message: string;
  data:  object | null
}

export interface IResponseBodyWithoutData {   
  type: boolean;
  message: string;
}