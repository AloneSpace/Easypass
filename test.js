const axios = require("axios");

axios.get("http://127.0.0.1:5000/get_data").then(response => {
  console.log(response.data);
});
