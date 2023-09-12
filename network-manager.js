const axios = require('axios');

/**
 * Make multiple HTTP requests in parallel with a specified delay between requests.
 * @param {string} url - The URL to request.
 * @param {number} delay - The delay between requests in milliseconds.
 * @param {number} numRequests - The number of requests to make.
 * @returns {Promise<Array>} - An array of responses.
 */
async function makeParallelRequests(url, delay, numRequests) {
    // Create an array of promises for making requests.
    const requestPromises = [];

    for (let i = 0; i < numRequests; i++) {
        requestPromises.push(
            new Promise(async (resolve) => {
                try {
                    const response = await axios.get(url);
                    resolve(response.data);
                } catch (error) {
                    resolve({ error: 'Request failed' });
                }
            })
        );

        if (i < numRequests - 1) {
            // Add a delay between requests.
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }

    // Use Promise.all to make all requests in parallel.
    const responses = await Promise.all(requestPromises);

    return responses;
}

module.exports = { makeParallelRequests };
