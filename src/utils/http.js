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
export const post=( url ,data)=>{
  return axios({
    method: 'post',
    data,
    url
  })
  .then((result)=>{
     return result.data.data
  })
  .catch((err)=>{
     return err.message
  })
}
