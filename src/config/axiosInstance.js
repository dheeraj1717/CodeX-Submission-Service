const axios = require("axios");
const { PROBLEM_ADMIN_SERVICE_URL } = require("./serverConfig");

const axiosInstance = axios.create({
    baseURL: `${PROBLEM_ADMIN_SERVICE_URL}/api/v1`,
    headers: {
        "Content-Type": "application/json"
    }
});

module.exports = axiosInstance;