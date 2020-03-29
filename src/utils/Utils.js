import axios from 'axios'
export default {
  httpGet(uri, params) {
    return axios.get(
      `https://tyspine.com/service/kakeibo/${uri}`,
      {
        params,
        headers: {
          "Authorization": `Bearer ${localStorage.authToken}`
        }
      }
    )
  },
  httpPost(uri, params) {
    let formParams = new URLSearchParams();
    for (let paramKey in params) {
      formParams.append(paramKey, params[paramKey]);
    }
    return axios.post(
      `https://tyspine.com/service/kakeibo/${uri}`,
      formParams,
      {
        headers: {
          "Authorization": `Bearer ${localStorage.authToken}`
        }
      }
    )
  }
}