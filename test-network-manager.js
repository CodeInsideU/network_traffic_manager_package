const { expect } = require('chai');
const { makeParallelRequests } = require('./network-manager');

// Rest of your test code...
describe('Network Manager', () => {
    it('should make multiple requests in parallel with a delay', async function () {
        this.timeout(10000); // Set a 30-second timeout
        try {
            console.log('Starting test...');
            const url = 'https://bard.google.com/'; // Use a test API
            const delay = 1000; // 1-second delay
            const numRequests = 5;

            const responses = await makeParallelRequests(url, delay, numRequests);

            // Ensure there are 5 responses in the array
            expect(responses).to.have.lengthOf(numRequests);
            console.log('Test completed successfully.');
        } catch (error) {
            console.error('Test failed: ', error);
            throw error;
        }
    });
});
