import React, { useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import PostDashboard from "../../features/posts/dashboard/PostDashboard";
import { Route, Switch } from "react-router";
import PostDetails from "./features/posts/details/PostDetails";
import "swiper/swiper.scss";
import { useStore } from "./stores/Store";
import PostForm from "./features/posts/forms/PostForm";
import { observer } from "mobx-react-lite";
import CategoryManager from "./features/categories/CategoryManager";
import LoadingComponent from "./LoadingComponent";
function App() {
  const { PostsStore } = useStore();
  const { CategoryListStore } = useStore();
  const { ListCategory, clists } = CategoryListStore;
  const { loadallposts , loadinginitial} = PostsStore;
  useEffect(() => {
    loadallposts();

    ListCategory();
  }, [loadallposts, ListCategory]);
  loadinginitial && <LoadingComponent content='Loading Posts'/>
  return (
   <>
      <Navbar />
      <Container style={{ marginTop: "5em" }}>
        <Switch>
          <Route exact path="/posts" component={PostDashboard} />
          <Route path="/posts/createform" component={PostForm} />
          <Route path="/posts/:id" component={PostDetails} />
          <Route path="/manage/category" component={CategoryManager} />
        </Switch>
      </Container>
   </>
  );
}

export default observer(App);
