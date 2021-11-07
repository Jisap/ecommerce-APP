import axios from 'axios';

const BASE_URl = "http://localhost:5000/api/";

export const LoadToken = async() => {
    let res = await JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken
    console.log(res)
    return res     
}

export const publicRequest = axios.create({
    baseURL: BASE_URl,
});

export const userRequest = axios.create({
    baseURL: BASE_URl,
    header: { token: `Bearer ${LoadToken()}`}
})