import axios from "axios";

export default axios.create({
  // baseURL : 'https://nestfit-api.life/api',
  baseURL : 'http://localhost:3002/api',
  withCredentials: true,
  headers : {
      'Content-Type': 'application/json',
  }
})

