import request from '@/tools/request'

function getModel(pk) {
    return request.get(`/course?pk=${pk}`)
}
function changeModel({ name, classify }) {
    return request.put('/course', `pk=${classify}&name=${name}`)
}
function addModel({ name, classify }) {
    return request.post('/course', `name=${name}&classify=${classify}`)
}
function delModel(pk) {
    return request({
        url: '/course',
        data: `pk=${pk}`,
        method: 'delete',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
export default {
    getModel,
    changeModel,
    addModel,
    delModel
}