import axios from 'axios';

const client = (() =>
  axios.create({
    baseURL: 'https://api.staging.tauros.io',
    timeout: 30000,
  }))();

export default client;
