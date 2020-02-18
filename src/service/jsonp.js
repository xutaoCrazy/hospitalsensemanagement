import jsonp from 'jsonp'
import qs from 'qs'

export default function(options) {
  const { params, timeout, prefix, name } = { ...options }
  const param = `${qs.stringify(params)}&callback`
  return new Promise((resolve, reject) => {
    jsonp(options.url, {
      param,
      timeout,
      prefix,
      name
    }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
