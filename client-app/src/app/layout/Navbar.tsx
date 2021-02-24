import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from './stores/Store';

const Navbar = () => {
    const { PostsStore } = useStore();
    const { openForm} = PostsStore;
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header as={Link} to='/posts'>
                    <img src="/assets/logo.png"  alt='logo' style={{marginRight:10}}/>
                    SaiCollections
                </Menu.Item>
                <Menu.Item>
                <Button  positive content='Create Post' onClick={() =>openForm()}  as={NavLink} to='/posts/createform'/>
                </Menu.Item>
                
            </Container>

        </Menu>
            
       )
   
    }
    export default Navbar