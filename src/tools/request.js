import axios from "axios";
import cookie from 'js-cookies'

const instance = axios.create({
    baseURL: "https://www.chengzier.cn:8000/api",
    timeout: 10 * 1000,
})
export default instance;