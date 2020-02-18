import AnswerSystem from '@/service/api/answerService'
import store from '@/store';
import jsonp from '@/service/jsonp';
export const promiseInterFace = () => { //  获取医疗保险机构
  let data = new Promise((resolve, reject) => {
    let url = 'institutaions'
    let param = {
      scriptId: 1100002
    }
    let orderApi = new AnswerSystem()
    orderApi.list(param, url).then(
      ({
        data
      }) => {
        if (data.result === 'Success') {
          resolve(data.list)
        }
      },
      error => {
        reject(error.message)
      }
    )
  })
  return data
}

export const promiseTabel = (param, url) => { // 表格方法
  let data = new Promise((resolve, reject) => {
    let orderApi = new AnswerSystem()
    orderApi.list(param, url).then(
      ({
        data
      }) => {
        if (data.result === 'Success') {
          resolve(data)
        } else {
          reject(data.resultMsg)
        }
      },
      error => {
        reject(error.message)
      }
    )
  })
  return data
}
export const promiseAjax = (param, url) => { //  获取接口方法
  let data = new Promise((resolve, reject) => {
    let orderApi = new AnswerSystem()
    orderApi.list(param, url).then(
      ({
        data
      }) => {
        if (data.result === 'Success') {
          resolve(data)
        } else {
          reject(data.resultMsg)
        }
      },
      error => {
        reject(error.message)
      }
    )
  })
  return data
}
export const promiseCommonAjax = (param, url) => { //  获取公共接口方法
  let data = new Promise((resolve, reject) => {
    let orderApi = new AnswerSystem()
    orderApi.commonPost(param, url).then(
      (
        data
      ) => {
        if (data.data.result === 'Success') {
          resolve(data.data.resultMsg)
        } else {
          reject(data.data.resultMsg)
        }
      },
      error => {
        reject(error.message)
      }
    )
  })
  return data
}


export const medicalInsuranceCardAJax = (param, url, type) => { //  获取公共接口方法
  let data = new Promise((resolve, reject) => {
    let orderApi = new AnswerSystem()
    orderApi.commoninsuranceCardAjax(param, url, type).then(
      (
        data
      ) => {
        if (data && data.data.result === 'Success') {
          resolve(data.data)
        } else {
          if (data) {
            reject(data.data)
          } else {
            reject(data)
          }

        }
      },
      error => {
        reject(error.message)
      }
    )
  })
  return data
}


export const sysSchedule = (param, url, type) => { //获取公共方法
  let data = new Promise((resolve, reject) => {
    let orderApi = new AnswerSystem()
    orderApi.userConfig(param, url, type).then(
      (
        data
      ) => {
        debugger;
        if (data.data.result === 'SUCCESS') {
          resolve(data.data)
        } else {
          reject(data.data)
        }
      },
      error => {
        reject(error.message)
      }
    )
  })
  return data
}


export const commonIDAjax = (param, url, type) => { //  获取脚本id
  let data = new Promise((resolve, reject) => {
    let orderApi = new AnswerSystem()
    orderApi.common(param, url, type).then(
      (
        data
      ) => {
        if (data.data.code === '200' || data.data.result.toLowerCase() == 'success') {
          resolve(data.data)
        } else {
          reject(data.data.resultMsg)
        }
      },
      error => {
        reject(error.message)
      }
    )
  })
  return data
}

export const externalCallAjax = (url, params) => { //  调用其他系统接口
  let data = new Promise((resolve, reject) => {
    let orderApi = new AnswerSystem()
    orderApi.externalcall(url, params).then(
      (
        data
      ) => {
        resolve(data)
      },
      error => {
        reject(error.message)
      }
    )
  })
  return data
}


export const commonAjaxRequest = (param, url, type) => {
  let data = new Promise((resolve, reject) => {
    let orderApi = new AnswerSystem()
    orderApi.commonAjax(param, url, type).then(
      (
        data
      ) => {
        debugger;

        resolve(data.data)

      },
      error => {
        reject(error.message)
      }
    )
  })
  return data
}


/**
 * 查询用户的loginFilter用于对比本地loginFilter，以判断用户登录状态是否失效
 * @returns {Promise | Promise<unknown>}
 */
export const getUserCode = (url,params) => {
  return jsonp({
    url: `${store.state.centerurl}/cloud/sysUser/${url}`,
    params:params
  })
}
