// Import the Axios library
const axios = require('axios');

// APIHandler class
class APIHandler {
  // Function to make a GET request
  static async get(url: string, username="", password="", config = {}, maxRetries = 5) {

    console.log(url);

    if (username.length > 0){
      config = {
        ...config,
        auth: {
          username,
          password,
        },
      };  
    }

    for (let retry = 1; retry <= maxRetries; retry++) {

      try {
        const response = await axios.get(url, config);
        return response;
      } catch (error) {
        console.error('API GET request failed');
        // console.log(error)
      }
      // Delay before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Function to make a POST request
  static async post(url: string, data = {}, config = {}, maxRetries = 5) {
    for (let retry = 1; retry <= maxRetries; retry++) {
      try {
        const response = await axios.post(url, data, config);
        return response;
      } catch (error) {
        console.error('API POST request failed, trying again...');
      }
      // Delay before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Function to make a PUT request
  static async put(url: string, data = {}, config = {}, maxRetries = 5) {
    for (let retry = 1; retry <= maxRetries; retry++) {
      try {
        const response = await axios.put(url, data, config);
        return response;
      } catch (error) {
        console.error('API PUT request failed:', error);
      }
      // Delay before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Function to make a DELETE request
  static async delete(url: string, config = {}, maxRetries = 5) {
    for (let retry = 1; retry <= maxRetries; retry++) {
      try {
        const response = await axios.delete(url, config);
        return response;
      } catch (error) {
        console.error('API DELETE request failed');
      }
      // Delay before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

export default APIHandler;