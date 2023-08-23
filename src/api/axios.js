import axios from "axios";

export const isLogin = async () => {
    const userId_front = sessionStorage.getItem("userId");
    const userId_back = await axiosPromise.get("/login");

    console.log(userId_front, userId_back, userId_front == userId_back);
    if(userId_front && userId_front == userId_back) return userId_front;
    return null; 
}

export default {
    post: (uri, data, defaultValue) => {
        return new Promise((resolve) =>
          axios
            .post(uri, data)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                resolve(defaultValue ?? null);
            })
        );
    },

    get: (uri, defaultValue) => {
        return new Promise((resolve) =>
          axios
            .get(uri)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                resolve(defaultValue ?? null);
            })
        );
    },

    put: (uri, data, defaultValue) => {
        return new Promise((resolve) =>
          axios
            .put(uri, data)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                resolve(defaultValue ?? null);
            })
        );
    },

    delete: (uri) => {
        console.log(uri);
        return new Promise(() =>
            axios
                .delete(`http://localhost:8080${uri}`)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                })
        );
    }
};