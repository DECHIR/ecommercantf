import axios from "axios";

const instance = axios.create({
    baseUrl: "https://ecommercants-api.onrender.com",
});

export default instance;
