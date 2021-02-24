import { useHistory } from 'react-router-dom';
import { Ipost } from './../models/post';
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { createContext } from 'react';
import { store } from './Store';
import { toast } from 'react-toastify';



export default class PostStore
{
    
    Store:store
   constructor(Store : store) {
      this.Store= Store;
      makeAutoObservable(this);
    }
    
PostReqistry =new Map()
    posts:Ipost[] =[];
    selectedPost:Ipost|undefined;
    loading=false;
    submititng=false;
    loadinginitial=false;

loadallposts = async() =>{
this.loadinginitial=true;
try{
    const posts = await agent.Posts.list();
    runInAction(() =>{
    posts.map((post:Ipost) =>{
this.posts.push(post);
this.loadinginitial=false;
this.selectedPost=post;
    })    
})
   
}catch(error)
{
    console.log(error.response);
    runInAction(() =>{

    this.loadinginitial=false;
    })
}
}

loadpost =async(id:string) =>{
    this.loadinginitial=true;
    let post:Ipost = this.getpost(id);
    if(post)
    {
        this.selectedPost=post;
    }
    else{
    try {
        const post = await agent.Posts.details(id);
        runInAction(() =>{

        this.selectedPost= post;
        this.PostReqistry.set(post.id,post);
        this.loadinginitial=false
        return post;
        })
    } catch (error) {
        console.log(error.response);
        runInAction(() =>{

        this.loadinginitial=false
        })
    }
    }
}

getpost = (id:string) =>{
   

    return this.PostReqistry.get(id);
    
}
cancelSelectedActivity =() =>{
    runInAction(() =>{

this.selectedPost=undefined;
    })
}
openForm =(id?:string) =>{
    runInAction(() =>{

id?this.loadpost(id):this.cancelSelectedActivity();
    })
}
CreatePost = async(post:Ipost) =>{
this.submititng=true;
try {
     await agent.Posts.create(post);
     runInAction(() =>{

     this.PostReqistry.set(post.id,post);
     this.selectedPost=post
     this.submititng=false;
     })
} catch (error) {
    console.log(error.response);
    runInAction(() =>{

    this.submititng=false
    })
}
}

EditPost =async(post:Ipost) =>{
    this.loading= true;
    try {
        await agent.Posts.update(post);
        runInAction(() =>{

        this.PostReqistry.set(post.id,post);
        this.selectedPost = post
        this.loading=false
        })
    } catch (error) {
        console.log(error.response);
        runInAction(() =>{

     this.loading=false   
        })
    }
}
DeletePost =async(id?:string) =>{
this.loading=true;
if(id){
try {
    await agent.Posts.delete(id);
    runInAction(() =>{

    this.PostReqistry.delete(id);
    this.loading=false;
    this.selectedPost=undefined;
    toast.success("Post Deleted Successfully");
    })

} catch (error) {
    console.log(error.response);
    runInAction(() =>{

    this.loading=false;
    toast.error("Problem Deleting POst , Check console for more details")
    })
}
}
}

}

