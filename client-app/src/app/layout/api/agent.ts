import { ICategory } from './../models/ICategory';
import { Ipost } from './../models/post';
import axios, { AxiosResponse } from "axios";

const responseBody = (response : AxiosResponse) => response.data;

axios.defaults.baseURL='http://localhost:5000/api'
const sleep =(ms:number) =>(response : AxiosResponse) =>
     new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response),ms))


const requests = {
    get:(url:string) =>axios.get(url).then(sleep(1000)).then(responseBody),
    post:(url:string,body:{}) =>axios.post(url, body).then(sleep(1000)).then(responseBody),
    put:(url:string,body:{}) => axios.put(url,body).then(sleep(1000)).then(responseBody),
    del:(url:string) =>  axios.delete(url).then(sleep(1000)).then(responseBody)
}

const Posts ={
    list:():Promise<Ipost[]> => requests.get('/posts'),
    details:(id:string):Promise<Ipost> => requests.get(`/posts/${id}`),
    create:(post:Ipost) => requests.post('/posts',post),
    update:(post:Ipost) => requests.put(`/posts/${post.id}`,post),
    delete:(id:string) =>requests.del(`/posts/${id}`)

}

const categoryLists ={
    list:()=> requests.get('/CategoryList'),
    create:(category:ICategory)=>requests.post('/CategoryList',category),
    update:(category:ICategory) => requests.put(`/CategoryList/${category.id}`,category),
    delete:(id:number) => requests.del(`/CategoryList/${id}`)
}
export default {Posts, categoryLists}