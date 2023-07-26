import request from '../tools/request'

function login(form) {
    return request.post('/supersignin', `username=${form.username}&password=${form.password}&uuid=${form.uuid}&text=${form.code}`)
}
export default{
    login,
}