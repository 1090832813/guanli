import request from '../tools/request'
import cookie from 'js-cookies'
const headers={ headers: { 'Authorization': 'Bearer ' + cookie.getItem('SESSDATA') } }
var myHeaders = new Headers();
myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

var urlencoded = new URLSearchParams();
urlencoded.append("pk", "168");

var requestOptions = {
   method: 'GET',
   headers: myHeaders,
   body: urlencoded,
   redirect: 'follow'
};


function getVideo({pk1,pk2}){
    return fetch("https://www.chengzier.cn:8000/api/chapter_video?pk=47", requestOptions,headers)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
// request({
//     url:`/chapter_video?pk=47`,
//     method:'post',
//     headers:{"Content-Type":'application/x-www-form-urlencoded'},
//     data:{
//         pk1:pk2
//     }
// })
export default{
    getVideo,

}