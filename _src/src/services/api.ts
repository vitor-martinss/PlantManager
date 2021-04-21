import axios from 'axios'

const api = axios.create({
	baseURL: 'http://192.168.1.75:19000'
})

export default api