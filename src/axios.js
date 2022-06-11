import axios from "axios";

const instance = axios.create({
  baseURL:'http://localhost:5001/projectone-32958/us-central1/api'
})


export default instance;