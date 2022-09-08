import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
/* const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
} */
const getAll = async() => {
  const response = await axios.get(baseUrl)
  return  response.data
}
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
/* const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
} */
/* const addLike = (newObject) => {
  newObject.likes += 1
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject, {
    headers: { Authorization: token }
  })
  return request.then((response) => response.data)
} */
const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  const response = await request
  return response.data
}
/* const remove = id => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`,config)
  return request.then(response => response.data)
} */
const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`,config)
  return response.data
}

export default { getAll, create,update,remove, setToken }