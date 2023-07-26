import request from '@/tools/request'

function getRiseUser(){
    return request.get('/currentusers')
}
function getRiseVip(){
    return request.get('/currentvipusers')
}
function getRiseMoney(){
    return request.get('/currenttotalpay')
}
function getAllMoney(){
    return request.get('/gop')
}

export default{
    getAllMoney,
    getRiseMoney,
    getRiseUser,
    getRiseVip
}