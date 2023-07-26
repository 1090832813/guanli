import request from '@/tools/request'

function getVip() {
    return request.get('/vip')
}
function addVip({ name, description, origin_price, price, expires }) {
    return request.post('/vip', `name=${name}&description=${description}&origin_price=${origin_price}&price=${price}&expires=${expires}`)
}
function changeVip({ name, description, origin_price, price, expires, id }) {
    return request.put('/vip', `name=${name}&description=${description}&origin_price=${origin_price}&price=${price}&expires=${expires}&pk=${id}`)
}
function deleteVip(id) {
    return request({
        url: '/vip',
        method: 'delete',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: `pk=${id}`

    })
}
export default {
    getVip,
    addVip,
    changeVip,
    deleteVip
}