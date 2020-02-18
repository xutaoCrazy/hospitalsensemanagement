import axios from 'axios'
import Qs from 'qs'
export default function httpServe(url,data={},type="post",submitType){
    return new Promise(function(resolve, reject){
       let promiseObject={}
      if(submitType&&submitType=="formData"){
        data = Qs.stringify(data)
      }
      //get 请求
      if(new RegExp(type,'i').test('get')){
        let str = ''
        Object.keys(data).forEach(key =>{
          str += `${key}=${data[key]}&`
        })
        if(str){
          str=str.replace(/\&$/,'')
          url=`${url}?${str}`
        }    
        promiseObject = axios.get(url)
      } 
      //post请求
      if(new RegExp(type,'i').test('post')){
        promiseObject = axios.post(url,data)
      }
      promiseObject.then(function(response){
        response.data?resolve(response.data):resolve(response)
      }).catch(function(error){
        reject(error)
      })
    })
}
