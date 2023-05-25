import axios from "axios";

export default axios.create({
  baseURL : 'http://localhost:3002/api',
  withCredentials: true,
  headers : {
      'Content-Type': 'application/json',
  }
})

