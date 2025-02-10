import axios from 'axios'
const baseUrl = '/api/login'

const login = async (user) => {
  const resp = await axios.post(baseUrl, user)
  return resp.data
}

export default { login }
