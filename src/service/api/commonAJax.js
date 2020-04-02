import AnswerSystem from '@/service/api/answerService'

export const getlistdata = (param, url) => { // 获取列表
  let data = new Promise((resolve, reject) => {


    let orderApi = new AnswerSystem()
    orderApi.list(param, url).then(
      ({
        data
      }) => {
        if (data.code === '200') {
          resolve(data)
        }
      },
      error => {
        reject(data)
      }
    )
  })
  return data
}
export const getlSelect = (param, url) => { //  查询接口
  let data = new Promise((resolve, reject) => {
    let orderApi = new AnswerSystem()
    orderApi.list(param, url).then(
      ({
        data
      }) => {
        if (data.code === '200') {
          resolve(data)
        }
      },
      error => {
        reject(data)
      }
    )
  })
  return data
}

export const ajaxPost = (param, url) => { //  保存接口
  let data = new Promise((resolve, reject) => {
    let orderApi = new AnswerSystem()
    orderApi.save(param, url).then(
      ({
        data
      }) => {
        if (data.code === '200') {
          resolve(data)
        }
      },
      error => {
        reject(data)
      }
    )
  })
  return data
}
