import axios from "axios";

export function changeCount(body, theClass) {
  axios
    .post(`http://localhost:5000/api/${theClass}`, body)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.message;
    });
}
