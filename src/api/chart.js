import request from '@/tools/request'
import cookie from 'js-cookies'
const headers={ headers: { 'Authorization': 'Bearer ' + cookie.getItem('SESSDATA') } }
function getRiseUser(){
    return request.get('/currentusers',headers)
}
function getRiseVip(){
    return request.get('/currentvipusers',headers)
}
function getRiseMoney(){
    return request.get('/currenttotalpay',headers)
}
function getAllMoney(){
    return request.get('/gop',headers)
}

export default{
    getAllMoney,
    getRiseMoney,
    getRiseUser,
    getRiseVip
}