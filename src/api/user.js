import requestLogin from '../tools/requestLogin'
import request from "@/tools/request";
import cookie from 'js-cookies'

function verify() {
    return request.get("/superprofile", { headers: { 'Authorization': 'Bearer ' + cookie.getItem('SESSDATA') } })
}
function login(form) {
    return requestLogin.post('/supersignin', `username=${form.username}&password=${form.password}&uuid=${form.uuid}&text=${form.code}`)
}
function loginLog(page) {
    return request.get(`/supersigninlogs?page=${page}`)
}
function changePhoto(form) {
    let formdata = new FormData();
    formdata.append('avator', form)
    return request.post('/changesuperavator', formdata)
}
function oldCode() {
    return request.post('/superchangeemail')
}
function oldEmail(code) {
    return request.put('/superchangeemail', `text=${code}`)
}
function changeEmail(code) {
    return request.put('/superbindnewemail', `text=${code}`)
}
function newCode(email1) {
    return request.post('/superbindnewemail', `email1=${email1}&email2=${email1}`)
}
function superUser() {
    return request.get('/superusers')
}
function addSuperUser(name) {
    return request.post('/createsuperuser', `username=${name}`)
}
function delSuperUser(id) {
    return request({
        url: '/removesuperuser',
        method: 'delete',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: `pk=${id}`

    })
}
function changePwd({code,pwd}){
    return request.put('/superchangepwd',`text=${code}&pwd1=${pwd}&pwd2=${pwd}`)
}
function pwdCode(){
    return request.post('/superchangepwd')
}
function budCode(email){
    return request.post('/superbindemail',`email=${email}`)
}
function budEmail(code){
    return request.put('/superbindemail',`text=${code}`)
}
export default {
    verify,
    login,
    loginLog,
    changePhoto,
    oldEmail,
    oldCode,
    changeEmail,
    newCode,
    superUser,
    addSuperUser,
    delSuperUser,
    changePwd,
    pwdCode,
    budCode,
    budEmail,

}