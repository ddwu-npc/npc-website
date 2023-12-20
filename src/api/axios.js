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

  postWithHeader: (uri, data, token) => {
    console.log("postWithHeader data", data);
    return new Promise((resolve) =>
      axios
        .post(uri, data, {
          headers: {
            Authorization: token, 
          },
        })
        .then(window.location.reload())
        .catch((error) => {
          console.log(error);
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

  getWithHeader: (uri, token) => {
    return new Promise((resolve) =>
      axios
        .get(uri, { 
          headers: {
            Authorization: token, 
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
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

  delete: (uri, contentType, board_id) => {
    console.log(uri);
    return new Promise(() =>
      axios
        .delete(uri)
        .then((response) => {
          //console.log("axios delete ",JSON.stringify(response.data));
          if (contentType === "comment") {
            window.location.reload();
          } else if (contentType === "post") {
            window.location.href = "/board/"+board_id; // Change the URL as needed
          } else {
            // Handle other content types as needed
          }
        })
        .catch((error) => {
          console.log(error);
        })
    );
  },
};

