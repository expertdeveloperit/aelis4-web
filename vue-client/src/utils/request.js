import axios from 'axios';
import { Message, MessageBox, Loading } from 'element-ui';
import constants from '@/utils/constants';
import authService from '@/utils/auth/auth0Service';

// axios
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api base_url
  timeout: 55000
});

// request
request.interceptors.request.use(
  (config) => {
    if (authService.accessToken) {
      config.headers.Authorization = `Bearer ${authService.accessToken}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  }
);

const getBlobMessageError = async (error) => {
  let blobErrorMessage;
  if (error.response.data instanceof Blob) {
    const responseBlob = error.response.data;
    let responseData = null;
    const responseText = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('abort', reject);
      reader.addEventListener('error', reject);
      reader.addEventListener('loadend', () => {
        resolve(reader.result);
      });
      reader.readAsText(responseBlob);
    });
    responseData = JSON.parse(responseText);
    blobErrorMessage = responseData.message;
  }
  return blobErrorMessage;
};

// response
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (response.status !== 200 && res.code !== 20000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      });

      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          this.authService.logOut();
        });
      }
      return Promise.reject(new Error('error'));
    }
    if (response.data instanceof Blob) {
      return response;
    }
    return response.data;
  },
  async (error) => {
    const loading = Loading.service(constants.LOADING.DEFAULT_CONFIG);
    if (error.response) {
      const blobErrorMessage = await getBlobMessageError(error);
      if (error.response.status === constants.HTTP_STATUS.PRECONDITION_FAILED) {
        Message.warning(error.response.data.message || blobErrorMessage);
      } else {
        Message({
          showClose: true,
          message: error.response.data.message || blobErrorMessage,
          type: 'error',
          duration: constants.MESSAGES.LONG_DURATION
        });
      }
    } else {
      /* Network Error 401 403 */
      Message({
        showClose: true,
        message: constants.HTTP_MESSAGES.INVALID_TOKEN,
        type: 'error',
        duration: constants.MESSAGES.LONG_DURATION
      });
      authService.login({ target: window.location.pathname });
    }
    loading.close();
    return Promise.reject(error);
  }
);

export default request;
