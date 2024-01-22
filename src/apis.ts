import axios from 'axios';

const baseUrl = process.env.REACT_APP_CODE_TEST_API;

// Start LoginForm
export const calculateResult = (inputData) =>
  axios({
    method: 'post',
    url: `${baseUrl}/results`,
    data: {
      inputData
    },
  });