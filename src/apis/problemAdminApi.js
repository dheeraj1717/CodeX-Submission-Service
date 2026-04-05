const axiosInstance = require("../config/axiosInstance");

async function fetchProblemDetails(problemId) {
    try {
        const response = await axiosInstance.get(`/problems/${problemId}`);
        return response.data;
    } catch (error) {
        console.log("Error while fetching problem details", error);
        throw error;
    }
}

module.exports = {
    fetchProblemDetails
};