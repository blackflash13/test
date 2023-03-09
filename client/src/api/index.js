import axios from "axios";
import {server_url} from "../config";

export default class ApiService {
    static async sendRequestToAPI(page, limit, searchType, query) {
        try {
            const url = query ? `${server_url}/api/tx?&page=${page}&limit=${limit}&type=${searchType}&value=${query}` : `${server_url}/api/tx?&page=${page}&limit=${limit}`;
            return await axios.get(url)
        } catch (e) {
            console.log(e.message)
            return e.message
        }


    }
}
