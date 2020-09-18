import axios from 'axios'
import 'dotenv/config'

//Connection with server
export default () => {
    var myAxios

    myAxios = axios.create({
        //baseURL: 'http://localhost:3000'
        baseURL: 'https://twgbackend12.azurewebsites.net/'
    })
    //console.log('Backend URL: ' + 'localhost:3000')
    myAxios.interceptors.response.use(
        function(response) { return response;}, 
        function(error) {
        // handle error
        if (error.response) {
            return Promise.reject(error)
        }
    })
    return myAxios
}