import axios from 'axios';

const BASE_URL = 'https://apis.ccbp.in/list-creation';

export const fetchLists = () => axios.get(`${BASE_URL}/lists`);

export const updateLists = (updatedData) =>
  axios.post(`${BASE_URL}/lists`, updatedData);
