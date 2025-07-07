// src/api/axios.js
import axios from "axios";

const CustomAxios = axios.create({
  baseURL: "http://localhost:5000/api", // we can use .env file s well here 
  headers: {
    "Content-Type": "application/json",
  },
});


export default CustomAxios;
