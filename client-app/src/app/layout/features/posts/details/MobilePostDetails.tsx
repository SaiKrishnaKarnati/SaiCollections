import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Header, Icon, Label, Segment, TextArea } from 'semantic-ui-react';
import {Swiper, SwiperSlide} from 'swiper/react'
import { useStore } from '../../../stores/Store';

const MobilePostDetails = () => {
    const { PostsStore } = useStore();
  const { posts, selectedPost, DeletePost } = PostsStore
  
    return (
        <>
         <Segment>
     <Swiper spaceBetween={150} id="main" navigation >
       <SwiperSlide>
         <img src="/assets/saree.jpg" alt="Saree" />
       </SwiperSlide>
     </Swiper>   
      <Header content={selectedPost?.displayName} as='h3' />
      <Icon name='inr'/> <Header content={selectedPost?.price} />
      <Label>
          <Icon name='truck' />Free Shipping
      </Label><br/><br/>
      <Label>
          <Icon name='calendar' />Dispatched in 2-3 days
      </Label>
      <Grid columns={2}>
              <Grid.Column>
                <Button color='blue' floated='left' as={Link} to='/posts/createform' content='Edit'/>
              </Grid.Column>
              <Grid.Column>
                <Button color='red'  as={Link} to='/posts' floated='right' onClick={() =>DeletePost(selectedPost?.id)} content='Delete'/>
              </Grid.Column>
            </Grid>
      </Segment>
      <Segment>
          <Header content="Select Size" as='h5' />
          <Label>
              {selectedPost?.sizes}
          </Label>
      </Segment>
     
          <Card style={{width:'90'}} fluid >
              <Card.Content >
                  <Card.Header>Product Description</Card.Header>
              </Card.Content>
              <Card.Content>
              {selectedPost?.description.split('\n').map(str => <p key={str}>{str}</p>)}
                  
                  
              </Card.Content>
        </Card>

     
      <Segment>
          <Grid columns={3}>
             <Grid.Column>
                 <Icon name='money' color='pink' size='big'/><br/>
                 Free Cash On Delivery
             </Grid.Column>
             <Grid.Column>``
            <Icon name='clock outline' color='pink'size='big' /><br/>
            4 Days Easy return
             </Grid.Column>
             <Grid.Column>
                 <br/>
                 Lowest Price Guarenteed
             </Grid.Column>
          </Grid>

      </Segment>
        </>
    )
}

export default observer(MobilePostDetails);
