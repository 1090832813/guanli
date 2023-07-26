import request from '../tools/request'

function getChapter(id){
    return request.get( `/chapter?pk=${id}`)
} 
function addChapter({pk, chapter_name}){
    return request.post( `/chapter`,`pk=${pk}&chapter_name=${chapter_name}`)
}
function deleteChapter(id){
    return request({
        url: '/chapter',
        method: 'delete',
        data:{
            pk:id
        },
        headers: {
            "Content-Type":'application/x-www-form-urlencoded'
        }
    })
}
function changeChapter({pk, chapter_name}){
    return request.put('/chapter',`pk=${pk}&chapter_name=${chapter_name}`)
}
export default {
    getChapter,
    addChapter,
    deleteChapter,
    changeChapter
}