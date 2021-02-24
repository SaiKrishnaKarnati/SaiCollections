import { toast } from 'react-toastify';
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { ICategory } from './../models/ICategory';
import { store } from './Store';
export default class CategoryList{

    Store:store
    constructor(Store : store) {
       this.Store= Store;
       makeAutoObservable(this);
     }
    CRegistry= new Map<string|number, ICategory>();
    clists : ICategory[] = [];
    submitting=false
    loading=false
    CreateCategory =async(category : ICategory) =>{
        this.submitting=true
        try {
            await agent.categoryLists.create(category)
            runInAction(() =>{
                this.clists.push(category);
            //this.CRegistry.set(category.id,category)
            this.submitting=false
            })
            toast.success("Created category Sucessfully")
        } catch (error) {
            console.log(error.response);
            runInAction(() =>{
            this.submitting=false
            })
            toast.error("Error in creating category")
        }
    }

    EditCategory =async(category:ICategory) =>{
        this.submitting=true
try {
await agent.categoryLists.update(category)
runInAction(() =>{
    this.clists =[...this.clists.filter( x => x.id !== category.id), category];
this.CRegistry.set(category.id,category);
this.submitting= false
})
    
} catch (error) {
    console.log(error.response);
    runInAction(() =>{
    this.submitting=true
    })
}

        
    }

    DeleteCategory =async(id: number) =>{
        this.submitting= true
        try {
            await agent.categoryLists.delete(id)
            runInAction(() =>{
            this.submitting= false;
            this.clists=[...this.clists.filter(x => x.id!==id)]
            this.CRegistry.delete(id);
            })
        } catch (error) {
            console.log(error.response);
            runInAction(() =>{
            this.submitting=false
            })
        }
    }

    ListCategory =async() =>{
        this.loading= true;
        this.submitting= true;
        try {
          const categories=  await agent.categoryLists.list();
          runInAction(() =>{
        categories.map((cat:ICategory) =>{
this.clists.push(cat);
console.log(this.clists);
this.submitting= false;
this.loading= false;
     
   })
            
        })
        } catch (error) {
            console.log(error.response);
            runInAction(() =>{
            this.submitting=false;
            this.loading=false;
            })
        }
    }


}