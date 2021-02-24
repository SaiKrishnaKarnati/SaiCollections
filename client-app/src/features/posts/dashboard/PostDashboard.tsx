import React, { useContext, useEffect } from "react";
import { Card, Grid, Header, Icon, Image } from "semantic-ui-react";
import { Ipost } from "../../../app/layout/models/post";
import "../../../app/layout/Dashboard.css";
import { useStore } from "../../../app/layout/stores/Store";
import { Link } from "react-router-dom";
import PostForm from "../../../app/layout/features/posts/forms/PostForm";
import { observer } from "mobx-react-lite";
import Loader from "../../../app/layout/LoadingComponent";
interface Iprops {
  posts: Ipost[];
}
var style = {
  marginTop: 60,
  marginLeft: 5,
  marginRight: 5,
};
const PostDashboard: React.FC = () => {
  const { PostsStore } = useStore();
  const { posts, loadallposts , loadinginitial} = PostsStore;
  console.log(posts);
loadinginitial && <Loader />
  return (
    <Grid columns="equal">
      {posts.map((post) => (
        <Grid.Column key={post.id}mobile={8} computer={4} tablet={8}>
          <Card raised as={Link} to={`/posts/${post.id}`}>
            <Image src="/assets/saree.jpg" wrapped ui={false} />
            <Card.Content>
              <Card.Header>{post.displayName}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <Header as="h4"><Icon name='inr'/>{post.price}</Header>
            </Card.Content>
          </Card>
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default  observer(PostDashboard);
