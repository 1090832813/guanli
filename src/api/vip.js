import request from '@/tools/request'
import cookie from 'js-cookies'
const headers={ headers: { 'Authorization': 'Bearer ' + cookie.getItem('SESSDATA') } }
function getVip() {
    return request.get('/vip',headers)
}
function addVip({ name, description, origin_price, price, expires }) {
    return request.post('/vip', `name=${name}&description=${description}&origin_price=${origin_price}&price=${price}&expires=${expires}`,headers)
}
function changeVip({ name, description, origin_price, price, expires, id }) {
    return request.put('/vip', `name=${name}&description=${description}&origin_price=${origin_price}&price=${price}&expires=${expires}&pk=${id}`,headers)
}
function deleteVip(id) {
    return request({
        url: '/vip',
        method: 'delete',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded','Authorization': 'Bearer ' + cookie.getItem('SESSDATA') },
        data: `pk=${id}`

    })
}
export default {
    getVip,
    addVip,
    changeVip,
    deleteVip
}