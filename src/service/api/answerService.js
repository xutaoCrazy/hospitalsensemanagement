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

}
