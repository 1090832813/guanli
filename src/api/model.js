import request from '@/tools/request'
import cookie from 'js-cookies'
const headers={ headers: { 'Authorization': 'Bearer ' + cookie.getItem('SESSDATA') } }
function getModel(pk) {
    return request.get(`/course?pk=${pk}`,headers)
}
function changeModel({ name, classify }) {
    return request.put('/course', `pk=${classify}&name=${name}`,headers)
}
function addModel({ name, classify }) {
    return request.post('/course', `name=${name}&classify=${classify}`,headers)
}
function delModel(pk) {
    return request({
        url: '/course',
        data: `pk=${pk}`,
        method: 'delete',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + cookie.getItem('SESSDATA')
        }
    })
}
export default {
    getModel,
    changeModel,
    addModel,
    delModel
}