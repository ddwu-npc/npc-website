import axios from "axios";

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
        .delete(uri)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        })
    );
  },
};
