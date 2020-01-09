import axios from 'axios'
export default {
  httpGet(uri, params) {
    return axios.get(
      uri,
      { params },
    )
  },
  httpPost(uri, params) {
    let formParams = new URLSearchParams();
    for(let paramKey in params) {
      formParams.append(paramKey, params[paramKey]);
    }
    return axios.post(
      uri,
      formParams,
    )
  },
}