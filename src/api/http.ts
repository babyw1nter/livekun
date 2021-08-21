import axios from 'axios'

const devURL = 'localhost:39074'

const baseURL = process.env.NODE_ENV === 'development' ? `http://${devURL}` : window.location.origin
const baseWsURL = process.env.NODE_ENV === 'development' ? `ws://${devURL}` : window.location.host

const http = axios.create({
  baseURL,
  timeout: 10000
})

http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

export { baseURL, baseWsURL }

export default http
