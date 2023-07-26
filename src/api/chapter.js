import request from '../tools/request'
import cookie from 'js-cookies'
const headers={ headers: { 'Authorization': 'Bearer ' + cookie.getItem('SESSDATA') } }
function getChapter(id){
    return request.get( `/chapter?pk=${id}`,headers)
} 

function addChapter({pk, chapter_name}){
    return request.post( `/chapter`,`pk=${pk}&chapter_name=${chapter_name}`,headers)
}
function deleteChapter(id){
    return request({
        url: '/chapter',
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
function changeChapter({pk, chapter_name}){
    return request.put('/chapter',`pk=${pk}&chapter_name=${chapter_name}`,headers)
}
export default {
    getChapter,
    addChapter,
    deleteChapter,
    changeChapter
}