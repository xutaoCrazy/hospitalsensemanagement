import ApiService from '../api.service'
import qs from 'qs'
export default class MaterialService extends ApiService {
  constructor() {
    super()
    this.path = 'cloud'
  }
  list(params, url) { //请求表格
    const path = `${this.path}/` + url
    return this.http.get(path, {
      params
    })
  }
  save(params, url) {
    const path = `${this.path}/` + url
    return this.http.post(path,
      params
    )
  }

}
