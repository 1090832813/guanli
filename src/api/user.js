import request from "@/tools/request";
import cookie from 'js-cookies'
const headers={ headers: { 'Authorization': 'Bearer ' + cookie.getItem('SESSDATA') } }
function verify() {
    return request.get("/superprofile",headers )
}

function loginLog(page) {
    return request.get(`/supersigninlogs?page=${page}`,headers)
}
function changePhoto(form) {
    let formdata = new FormData();
    formdata.append('avator', form)
    return request.post('/changesuperavator', formdata,headers)
}
function oldCode() {
    return request.post('/superchangeemail',headers)
}
function oldEmail(code) {
    return request.put('/superchangeemail', `text=${code}`,headers)
}
function changeEmail(code) {
    return request.put('/superbindnewemail', `text=${code}`,headers)
}
function newCode(email1) {
    return request.post('/superbindnewemail', `email1=${email1}&email2=${email1}`,headers)
}
function superUser() {
    return request.get('/superusers',headers)
}
function addSuperUser(name) {
    return request.post('/createsuperuser', `username=${name}`,headers)
}
function delSuperUser(id) {
    return request({
        url: '/removesuperuser',
        method: 'delete',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',  'Authorization': 'Bearer ' + cookie.getItem('SESSDATA')  },
        data: `pk=${id}`

    })
}
function changePwd({code,pwd}){
    return request.put('/superchangepwd',`text=${code}&pwd1=${pwd}&pwd2=${pwd}`,headers)
}
function pwdCode(){
    return request.post('/superchangepwd',headers)
}
function budCode(email){
    return request.post('/superbindemail',`email=${email}`,headers)
}
function budEmail(code){
    return request.put('/superbindemail',`text=${code}`,headers)
}
export default {
    verify,

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