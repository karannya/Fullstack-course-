import { useState } from "react";
import axios from "axios";
export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    const getAll = async() => {
        const response = await axios.get(baseUrl)
        return  setResources(response.data)
      }

      const create = async resource => {
        /* const config = {
          headers: { Authorization: token },
        } */
      
        const response = await axios.post(baseUrl, resource)
        return setResources([...resources, response.data])
      }  
    
    const service = {
      getAll,
      create
    }
  
    return [
      resources, service
    ]
  }