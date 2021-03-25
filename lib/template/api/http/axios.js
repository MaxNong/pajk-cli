import axios from 'axios';
import configApi from '../config/config';


axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
};
axios.defaults.baseURL = configApi.apiPath;
axios.defaults.timeout = 25000;
axios.defaults.withCredentials = false;

// 请求前
axios.interceptors.request.use(configer => {
    showLoading()
    return configer;
});

// 请求后
axios.interceptors.response.use(
    response => {
        if (response.data && response.data.status === '200') {
            return response.data;
        } else {
            if (response.data && response.data.status === 400 || response.data.respCode === '400') {
                Toast({ message: `${response.data.message}`, duration: 1000 });
            } else if (response.data && response.data.status === 500 || response.data.respCode === '500' || response.data.respCode === 500) {
                Toast({ message: `${response.data.message}`, duration: 1000 });
            }
            return Promise.reject(response.data);
        }
    },
    error => {
        Toast({ message: `网络异常，请稍后重试`, duration: 1500 });
    }
);

export default {
    get(url, data) {
        return axios({ method: 'get', url, params: data });
    },
    post(url, data) {
        return axios({ method: 'post', url, data });
    },
    delete(url, data) {
        return axios({ method: 'delete', url, data });
    },
    put(url, data) {
        return axios({ method: 'put', url, data });
    }
};