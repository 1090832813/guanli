import request from '../tools/request';
import cookie from 'js-cookies'
const headers={ headers: { 'Authorization': 'Bearer ' + cookie.getItem('SESSDATA') } }
function mainCourse() {
    return request.get('/classify',headers)
}
function addCourse(names) {
    return request.post('/classify',`name=${names}`,headers)
}
function changeCourse(id,newName) {
    return request.put('/classify',`pk=${id}&name=${newName}`,headers)
}
function deleteCourse(id) {
    return request({
        url: '/classify',
        method: 'delete',
        data:{
            pk:id
        },
        headers: {
            "Content-Type":'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + cookie.getItem('SESSDATA') 
        }
    })
}
export default {
    mainCourse,
    addCourse,
    changeCourse,
    deleteCourse,
}