import axios from "axios";

export default axios.create({
  baseURL : 'https://139.59.103.113/api',
  withCredentials: true,
  headers : {
      'Content-Type': 'application/json',
  }
})

