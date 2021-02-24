import { useContext } from 'react';
import { createContext } from 'react';
import PostStore from "./PostsStore"
import CategoryListStore from './CategoryListstore'

export class store{
    PostsStore:PostStore;
    CategoryListStore:CategoryListStore;
    constructor(){
        this.PostsStore= new PostStore(this);
        this.CategoryListStore= new CategoryListStore(this);
    }
}
    export const StoreContext = createContext(new store());
    export function useStore() {
        return useContext(StoreContext);
    }