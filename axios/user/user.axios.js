import axios from '../axios.config';

const host = "user"
export default {
    login(user) {
        const data = axios.post(`/login`, user);
        return data
    },
    signUp(user) {
        const data = axios.post(`/register`, user);
        console.log(data)
        return data
    },
}
