import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Grid, Header, Icon, Label, Segment } from "semantic-ui-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Ipost } from "../../../models/post";
import { useStore } from "../../../stores/Store";

interface Iprops {
  post: Ipost | undefined;
}
const ComputerPOstDetails: React.FC<Iprops> = () => {
  const { PostsStore } = useStore();
  const { posts, loadallposts , DeletePost, selectedPost:post} = PostsStore;
  const [Selectedpost, setSelectedpost] = useState<Ipost|undefined>();

  useEffect(() =>{
    setSelectedpost(post);
  },[post, Selectedpost])
  return (
    <Segment>
      <Grid columns={2}>
        <Grid.Column>
          <Swiper autoplay spaceBetween={150} id="main" pagination>
            <SwiperSlide>
              <img src="/assets/saree.jpg" alt="Saree" />
            </SwiperSlide>
          </Swiper>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Header content={Selectedpost?.displayName} />
            Price:
            <Icon name="inr" />
            {Selectedpost?.price}
            <br />
            <br />
            <Grid columns={2}>
              <Grid.Column>
                <Label>
                  <Icon name="truck" />
                  Free Shipping
                </Label>
              </Grid.Column>

              <Grid.Column>
                <Label>
                  <Icon name="calendar" />
                  Dispatched in 2-3 days
                </Label>
              </Grid.Column>
            </Grid>
            <Grid columns={2}>
              <Grid.Column>
                <Button color='blue' floated='left' as={Link} to='/posts/createform' content='Edit'/>
              </Grid.Column>
              <Grid.Column>
                <Button color='red'  as={Link} to='/posts' floated='right' onClick={() =>DeletePost(post?.id)} content='Delete'/>
              </Grid.Column>
            </Grid>
            <Card style={{ width: "90" }} fluid>
              <Card.Content>
                <Card.Header>Product Description</Card.Header>
              </Card.Content>
              <Card.Content>
                {Selectedpost?.description.split("\n").map((str) => (
                  <p key={str}>{str}</p>
                ))}
              </Card.Content>
            </Card>
            <Grid columns={3}>
              <Grid.Column>
                <Icon name="money" size="big" color='teal'/>
                <br />
                Free Cash on Delivery
              </Grid.Column>
              <Grid.Column>
                <Icon name="clock" size="big" color='teal'/>
                <br />4 Days Replacement policy
              </Grid.Column>
              <Grid.Column>
                {/* TOdo:- Icon */}
                <br />
                Safe Delivery
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default  observer(ComputerPOstDetails);
