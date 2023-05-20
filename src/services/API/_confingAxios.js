import axios from "axios";

export default axios.create({
  baseURL : 'http://api.nestfit.life/api',
  withCredentials: true,
  headers : {
      'Content-Type': 'application/json',
  }
})

