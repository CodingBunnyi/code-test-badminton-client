import axios from 'axios';
import { GetResultReq } from './type';

const baseUrl = process.env.REACT_APP_CODE_TEST_API;

// Start LoginForm
export const calculateResult = (inputData: GetResultReq) =>
  axios({
    method: 'post',
    url: `${baseUrl}/results`,
    data: {
      inputData
    },
  });