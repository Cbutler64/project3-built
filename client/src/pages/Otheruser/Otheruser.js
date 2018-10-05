import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Hero from "../../components/Hero";
import Nav from "../../components/Nav";
import SearchForm from "../../components/SearchForm";
import Youtube from '../../components/Youtube';
// import ModalPop from "../../components/Modal";
import Thumbnail from "../../components/Thumbnail";
import VideoCard from '../../components/Card2';
import ProfileCard from '../../components/ProfileCard';
import Modalpop from '../../components/Modal'
import "./Otheruser.css";

class Otheruser extends Component {
  // Setting our component's initial state

  state = {
    apiResults: [],
    searchQuery: "",
    user: [],
    users: [],
    realname: "",
    photo: "",
    gender: "",
    currentUserID: "",
    username: "",
    userFriends: [],
    userFriendObjs: []

  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    // this.setState({ currentuserID: localStorage.getItem("userID") })
    //console.log(this.state.currentUserID)
    // console.log(localStorage.getItem("userID"))
    this.loadUser(localStorage.getItem("userID"));
  }
  // Loads all User  and sets them to this.state.User
  loadUser = (id) => {
    API.getBook(id)
      .then(res => {
        this.setState({ user: res.data, username: res.data.realname, realname: res.data.realname, photo: res.data.photo, gender: res.data.gender, currentuserID: res.data._id, userFriends: res.data.friends, search: "", apiResults: [], })
        console.log(this.state.user)
        this.loadFriends()
      })
      .catch(err => console.log(err));
      
  };

  loadFriends = () => {
    API.getBooks()
      .then(res => {
        this.setState({
          users: res.data,
        })
        
        
        console.log(this.state.users)
        var userFriendObjs = []
        for (var i = 0; i < this.state.users.length; i++){
          if (this.state.userFriends.includes(this.state.users[i]._id))
          {
            userFriendObjs.push(this.state.users[i])
          }

        }
        this.setState({ userFriendObjs: userFriendObjs })
        console.log(this.state.userFriendObjs)
        
      })
      .catch(err => console.log(err));
  };
  // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  searchYoutube = query => {
    console.log(query)
    API.searchAPI(query)
      .then(res => {
        this.setState({ apiResults: res.data.items })
        console.log(this.state.apiResults);
      })
      .catch(err => console.log(err));
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchYoutube(this.state.searchQuery);
    // if (this.state.username && this.state.password) {
    //   API.getBooks()
    //     .then(res =>
    //       this.setState({ users: res.data })
    //     )
    //     .catch(err => console.log(err));
    // }
  };

  render() {
    return (
      <div>

        <Nav userLogged={this.state.user.username} />
        <Hero backgroundImage="https://coolbackgrounds.io/images/backgrounds/sea-edge-311c5cd5.png">
          <h1>Welcome {this.state.user.username}! </h1>

        </Hero>
        <br></br><br></br>
        <Container fluid>

          <Col size="md-7">

            <h4 className="text-center text-white" >My Profile</h4>
            <ProfileCard
              id={this.state.user._id}
              key={this.state.user._id}
              name={this.state.user.username}
              image={this.state.user.photo}
              realname={this.state.user.realname}
              gender={this.state.user.gender}

            />
            {/* <Container className = "video-container">

        
       
          
              <ListItem className = "video-container">
                
                {this.state.apiResults.map(result => (
         
                  <VideoCard image= {result.snippet.thumbnails.high.url} 
                  title = {result.snippet.title}
                 
                  ></VideoCard> 
                  
                  
                ))}
               
              </ListItem>
          
         
         
     
        </Container> */}
          </Col>
          <Col size="md-3">
            <Jumbotron>
              <h1>My Friends On My List</h1>
            </Jumbotron>
          
              <List>
                {this.state.userFriendObjs.map(user => {
                  return (
                    <ListItem key={user._id}>
                      <a href={"/otheruser/" + user._id}>
                      <strong>
                          {user.photo}  
                        </strong>

                      </a>
                      <strong>
                           {user.username}
                        </strong>
                    </ListItem>
                  );
                })}
              </List>

          </Col>
        </Container>
      </div>
    );
  }
}
export default Otheruser;
