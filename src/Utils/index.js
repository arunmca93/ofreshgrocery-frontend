import axios from 'axios'
import { store } from '../Store/Persistor'

axios.defaults.baseURL = 'http://localhost:4000'

//Request intercaptors
axios.interceptors.request.use(req=>{

    if(store.getState().token!==''){
        req.headers['authorization']=`Bearer ${store.getState().token}`
    }
    return req;
},err=>{ console.log(err)})


//Response interceptors
axios.interceptors.response.use(res=>{

    return res;
},err=>{ console.log(err)})


export default axios;