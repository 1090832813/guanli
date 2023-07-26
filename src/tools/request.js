import axios from "axios";
import cookie from 'js-cookies'
let token = cookie.getItem('SESSDATA')

const instance = axios.create({
    baseURL: "https://www.chengzier.cn:8000/api",
    timeout: 10 * 1000,
    headers: { 'Authorization': 'Bearer ' + token ,}

})
export default instance;