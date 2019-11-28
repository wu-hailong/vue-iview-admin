import axios from "axios"

export const get=( url )=>{
  return axios({
    method: 'get',
    url
  })
  .then((result)=>{
     return result.data.data
  })
  .catch((err)=>{
     return err.message
  })
}
