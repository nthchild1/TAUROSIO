import axios from 'axios';

const client = (() =>
  axios.create({
    baseURL:
      'https://gist.github.com/jeezascodes/3c65a75c9772c66692ccea4a6ea7a9b7',
    timeout: 30000,
  }))();

export default client;
