import {get, post} from "../service";

let base = `/api/v1.0/user`

//登录
export const login = params => post(`${base}/login`,params)