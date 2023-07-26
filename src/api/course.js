import request from '../tools/request';

function mainCourse() {
    return request.get('/classify')
}
function addCourse(names) {
    return request.post('/classify',`name=${names}`)
}
function changeCourse(id,newName) {
    return request.put('/classify',`pk=${id}&name=${newName}`)
}
function deleteCourse(id) {
    return request({
        url: '/classify',
        method: 'delete',
        data:{
            pk:id
        },
        headers: {
            "Content-Type":'application/x-www-form-urlencoded'
        }
    })
}
export default {
    mainCourse,
    addCourse,
    changeCourse,
    deleteCourse,
}