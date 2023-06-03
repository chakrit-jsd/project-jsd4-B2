import axios from "axios";
export default axios.create({
  baseURL : 'https://nestfit-api.life/api',
  withCredentials: true,
  headers : {
    'Content-Type': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
