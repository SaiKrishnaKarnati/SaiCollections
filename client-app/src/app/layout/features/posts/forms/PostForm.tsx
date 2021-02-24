import React, { ChangeEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/Store";
import { CategoryOptions } from "./CategoryOptions";
import {v4 as uuid} from 'uuid'
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../LoadingComponent";
const PostForm: React.FC = () => {
  const { PostsStore } = useStore();
  const { CreatePost, selectedPost, EditPost, loading ,loadinginitial} = PostsStore;
  const InitialState = selectedPost ?? {
    id: "",
    displayName: "",
    price: 0,
    description: "",
    sizes: "",
    Image: null,
    category:""
  };
  const history = useHistory();
  const [post, SetPost] = useState(InitialState);
  const handleSubmit = () => {
    if (post.id) {
      console.log(post);
      EditPost(post);
      loading === false && history.push(`/posts/${post.id}`)
    } else {
      post.id=uuid();
      CreatePost(post);
      loading === false && history.push(`/posts/${post.id}`)
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    SetPost({ ...post, [name]: value });
  };
  loadinginitial && <LoadingComponent  content='Loading Form'/>
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="DisplayName"
          value={post.displayName}
          name="displayName"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Price"
          value={post.price}
          name="price"
          onChange={handleInputChange}
        />
        <Form.TextArea
       style={{minHeight : 180}}
          placeholder="Description"
          value={post.description}
          name="description"
          
          onChange={handleInputChange}
        />
        <Form.Select
        placeholder="Select category"
        options={CategoryOptions}
        value={post.category}
        />
        <Form.Input
          placeholder="Sizes"
          value={post.sizes}
          name="sizes"
          onChange={handleInputChange}
        />
        <Button floated="right" type="submit" positive content="Submit" />
        <Button floated="right" as={Link} to='/posts' type="button" color="red" content="Cancel" />
      </Form>
    </Segment>
  );
};

export default observer(PostForm);
