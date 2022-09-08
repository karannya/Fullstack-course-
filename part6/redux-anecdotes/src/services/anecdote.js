import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async() => {
    const response = await axios.get(baseUrl)
    console.log(response)
    return  response.data
  }

const create = async content => {
    const newObject = { content, votes: 0 };
    const response = await axios.post(baseUrl, newObject)
  return response.data
}  

/* const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return  response.data
  } */

  const increaseVote = async (object) => {
    const newObject={ ...object, votes: object.votes + 1 }
	const response = await axios.put(`${baseUrl}/${object.id}`,newObject );
	return response.data;
};

  export default { getAll, create,increaseVote }  