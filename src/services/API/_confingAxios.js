import axios from "axios";

export default axios.create({
  baseURL : 'http://139.59.103.113',
  withCredentials: true,
  headers : {
      'Content-Type': 'application/json',
  }
})

