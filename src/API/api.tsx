import axios from "axios";





export const taskApi = {
    getTasks(){
      return axios.get('https://jsonplaceholder.typicode.com/todos')
            .then((res) =>{
                return res
            })
    }
}
