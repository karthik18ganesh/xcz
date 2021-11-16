import axios from 'axios';
//    const axios = require("axios").default;

export default axios.create({
  //baseURL: `http://localhost:8080`,
  baseURL: `https://d3b9-117-247-207-14.ngrok.io`,
  //baseURL: https://api.esratrackcovid.com,https://api.nypcovidtracker.com
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
