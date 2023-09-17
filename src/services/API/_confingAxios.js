import axios from "axios";
export default axios.create({
  baseURL : import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers : {
    'Content-Type': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  xsrfCookieName: 'connect.sid',
})
