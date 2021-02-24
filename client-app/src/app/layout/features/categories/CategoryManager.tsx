import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Segment,
} from "semantic-ui-react";
import LoadingComponent from "../../LoadingComponent";

import { ICategory } from "../../models/ICategory";
import { useStore } from "../../stores/Store";

const RenderCatgeoryCreater = () => {
  <Card>
    <Card.Content header="Create Category" />
    <Card.Content>
      <Input placeholder="Name" />
    </Card.Content>
    <Card.Content extra>
      <Button content="Go Back" color="red" />
      <Button content="Create" color="green" />
    </Card.Content>
  </Card>;
};
const CategoryManager = () => {
  const { CategoryListStore } = useStore();
  const {
    clists,
    CreateCategory,
    submitting,
    loading,
    DeleteCategory,
    EditCategory,
  } = CategoryListStore;
  const [VisibleCreate, SetVisiblecreate] = useState(false);

  const InitialState = {
    id: 0,
    cname: "",
  };
  const [Category, SetCategory] = useState<ICategory>(InitialState);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    SetCategory({ ...Category, [name]: value });
  };
  const handleSubmit = () => {
    const ids: number[] = [];
    clists.map((clist) => {
      ids.push(clist.id);
    });
    const largeid = Math.max(...ids) + 1;
    if (Category.id) {
      EditCategory(Category);
      SetCategory(InitialState);
      SetVisiblecreate(false);
    } else {
      Category.id = largeid;
      CreateCategory(Category);
      Category.id = 0;
      SetVisiblecreate(false);
    }
  };
  const handleEditform = (cat: ICategory) => {
    SetVisiblecreate(true);
    SetCategory(cat);
  };
  const handleBackForm = () => {
    SetCategory(InitialState);
    SetVisiblecreate(false);
  };
  loading && <LoadingComponent content="loading Categories" />;
  return (
    <Segment>
      <Grid columns={2}>
        <Grid.Column>
          {clists.map((cat) => (
            <Card.Group key={cat.id}>
              <Card style={{ width: 140 }}>
                <Card.Content>
                  <Card.Header>{cat.cname}</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Button
                    icon
                    size="tiny"
                    floated="left"
                    loading={submitting}
                    onClick={() => DeleteCategory(cat.id)}
                  >
                    <Icon circular name="trash" color="red" />
                  </Button>
                  <Button
                    icon
                    size="tiny"
                    floated="right"
                    onClick={() => handleEditform(cat)}
                  >
                    <Icon circular name="edit" color="blue" />
                  </Button>
                </Card.Content>
              </Card>
            </Card.Group>
          ))}
        </Grid.Column>
        <Grid.Column>
          <Button
            onClick={() => SetVisiblecreate(true)}
            disabled={VisibleCreate}
          >
            <Grid columns={2}>
              <Grid.Column>
                <Button.Content>
                  <Icon name="add circle" color="blue" />
                </Button.Content>
              </Grid.Column>
              <Grid.Column floated="left">
                <Button.Content>Add</Button.Content>
              </Grid.Column>
            </Grid>
          </Button>
          {VisibleCreate && (
            <Segment>
              {Category.cname.length === 0 ? (
                <Header as="h2">Create Category </Header>
              ) : (
                <Header as="h2">Edit Category </Header>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Input value={Category.id} name="id" disabled />
                <Form.Input
                  fluid
                  placeholder="Name"
                  name="cname"
                  onChange={handleInputChange}
                  value={Category.cname}
                />
                <Grid columns="2">
                  <Grid.Column>
                    <Button
                      content="B"
                      onClick={() => handleBackForm()}
                      color="red"
                    >  <Icon name='arrow circle left' color="blue" /></Button>
                  </Grid.Column>
                  <Grid.Column>
                    <Button fluid  type="submit" loading={submitting}>
                      {Category.cname.length === 0 ? (
                        <Icon name="add circle" color="blue" />
                      ) : (
                        <Icon name ='edit' color="blue" />
                      )}
                    </Button>
                  </Grid.Column>
                </Grid>
              </Form>
            </Segment>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(CategoryManager);
