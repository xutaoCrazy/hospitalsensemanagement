import ApiService from '../api.service'
import qs from 'qs'
export default class MaterialService extends ApiService {
  constructor() {
    super()
    this.path = 'cloud/his'
  }
  list(params, url) {
    const path = `${this.path}/hoinsurance/` + url
    return this.http.get(path, {
      params
    })
  }

  userConfig(params, url) {
    this.path = 'cloud'
    const path = `${this.path}/SysSchedule/getSeverUserConfig/`
    return this.http.get(path, {
      params
    })
  }
  save(params, url) {
    // this.path = ''
    const path = `${this.path}/hoinsurance/` + url
    return this.http.post(path,
      params
    )
  }
  delete(params, url) {
    const path = `${this.path}/hoinsurance/` + url
    return this.http.delete(path,
      params
    )
  }
  commonPost(params, url) {
    const path = `${this.path}/hoinsurance/` + url
    return this.http.post(path,
      params
    )
  }
  commoninsuranceCardAjax(params, url, type) {
    const path = url
    if (type == 'POST') {
      return this.http.post(path,
        params
      )
    } else {
      return this.http.get(path, {
          params
        }

      )
    }

  }
  common(params, url, type) { //调用id
    debugger;
    if (type == 'POST') {
      const path = `${this.path}/common/query/` + url
      return this.http.request({
        url: path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: qs.stringify(params)
      })

    } else {
      const path = `${this.path}/common/query/` + url
      return this.http.get(path, {
        params
      })
    }

  }

  commonAjax(params, url, type) {
    debugger;
    this.path = 'cloud/'
    const path = `${this.path}` + url
    if (type) {
      return this.http.request({
        url: path,
        method: 'POST',
        data: qs.stringify(params)
      })
    } else {
      return this.http.request({
        url: path,
        method: 'GET',
        params: params
      })
    }

  }

}
