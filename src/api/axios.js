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

  postWithHeaderNoReload: (uri, data, token) => {
    return new Promise((resolve) =>
      axios
        .post(uri, data, {
          headers: {
            Authorization: token, 
          },
        })
        .then(response => {
          resolve(response.data); // 반환된 응답을 resolve 해줍니다.
        })
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

  getWithHeader: (uri) => {
    return new Promise((resolve) =>
      axios
        .get(uri, { 
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, 
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

  putWithHeader: (uri, data) => {
    return new Promise((resolve) =>
      axios
        .put(uri, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, 
          },
        }).then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          resolve(null);
        })
    );
  },
  
  delete: (uri, contentType, board_id) => {
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

