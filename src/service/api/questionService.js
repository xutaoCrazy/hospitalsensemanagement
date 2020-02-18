import ApiService from '../api.service'

export default class QuestionService extends ApiService {
  constructor () {
    super()
    this.path = 'question'
  }

  questionList (params) {
    const path = `${this.path}/questions`
    return this.http.get(path, {params})
  }

  homeList () {
    const path = `index`
    return this.http.get(path)
  }

  questionStatus (id, params) {
    const path = `${this.path}/online/${id}`
    return this.http.put(path, params)
  }
}
