import axios from "axios";

export const get = (param) => axios.get(`https://fakestoreapi.com/${param}`);
