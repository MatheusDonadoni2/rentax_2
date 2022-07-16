/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable prettier/prettier */
declare namespace Express{
  export interface Request{
    user:{
      id:string
    };
  }
}
