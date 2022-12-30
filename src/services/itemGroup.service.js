// Sitas failas suvalgo Spring endpointus ir leidzia naudoti funkcijose, pagal metodo pavadinimus
import authHeader from './auth-header';
import axios from 'axios';


const API_URL = 'http://localhost:8080/api/v1/';
const getAll = () => {
  return axios.get(API_URL + `itemGroups`, { headers: authHeader() });
};
const create = (data) => {
  return axios.post(API_URL + `itemGroup` , data, { headers: authHeader() });
};

const get = (id) => {
  return axios.get(API_URL + `itemGroup/${id}`, { headers: authHeader() });
};

const update = (data, id) => {
  return axios.post(API_URL + `itemGroup`, data, { headers: authHeader() });
};

const remove = (id) => {
  return axios.delete(API_URL + `itemGroup/${id}`, { headers: authHeader() });
};
export default { getAll, create, get, update, remove };