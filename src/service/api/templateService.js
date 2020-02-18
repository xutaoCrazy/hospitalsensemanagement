import ApiService from '../api.service'

export default class TemplateService extends ApiService {
  constructor () {
    super()
    this.path = 'template'
  }

  templateLists (params) {
    const path = `${this.path}/templates`
    return this.http.get(path, {params})
  }
  templateSort () {
    const path = `${this.path}/class`
    return this.http.get(path)
  }

  auditTemplate (params, id) {
    const path = `${this.path}/audit/${id}`
    return this.http.put(path, params)
  }
  sortLists (id) {
    const path = `${this.path}/subclasses/${id}`
    return this.http.get(path)
  }

  createTemplate (params, id) {
    const path = `${this.path}/subclass/${id}`
    return this.http.post(path, params)
  }
  updateTemplate (params, id) {
    const path = `${this.path}/subclass/${id}`
    return this.http.put(path, params)
  }

  deleteChildren (id) {
    const path = `${this.path}/subclass/${id}`
    return this.http.delete(path)
  }

  templateStatus (id, params) {
    const path = `${this.path}/online/${id}`
    return this.http.put(path, params)
  }

  delTemplate (id) {
    const path = `${this.path}/${id}`
    return this.http.delete(path)
  }

  sortSingleTemplate (params) {
    const path = `${this.path}/subclass_sort`
    return this.http.put(path, params)
  }

  templateDetail (id) {
    const path = `${this.path}/${id}`
    return this.http.get(path)
  }
}
