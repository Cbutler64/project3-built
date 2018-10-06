import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import Subtitle from '../../components/Subtitle'
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
import Modal from '../../components/Modal'
import "./Search.css";


class Search extends Component {
  // Setting our component's initial state

  state = {
    show: false,
    apiResults: [],
    searchQuery: "",
    user: [],
    realname: "",
    photo: "",
    gender: "",
    currentUserID: "",
    username: "",
    currentVideoID: "",
    userFriends: [],
    userVideos: [],
    userVideoObjs: []

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
    console.log(id)
    API.getBook(id)
      .then(res => {
        this.setState({ user: res.data, username: res.data.realname, realname: res.data.realname, photo: res.data.photo, gender: res.data.gender, currentuserID: res.data._id, userFriends: res.data.friends, userVideos: res.data.posts, search: "", apiResults: [], })
        console.log(this.state.userVideos)
        if (this.state.userVideos.length > 0) {
          this.loadVideos();
        }
      })
      .catch(err => console.log(err));

  };

  loadVideos = () => {
    console.log("test")
    for (var i = 0; i < this.state.userVideos.length; i++) {
      var query;
      if (query) {
        query = query + this.state.userVideos[i] + ",";
      }
      else {
        query = this.state.userVideos[i] + ",";
      }
    }
    var queryState = "multiSearch"
    console.log(query)
    API.searchAPI(queryState, query)
      .then(res => {
        this.setState({ userVideoObjs: res.data.items })
        console.log(this.state.apiResults);
        console.log(this.state.userVideoObjs)
        this.test()
      })
      .catch(err => console.log(err));

  };

  handleBtnPlay = id => {
    console.log(id)
    this.setState({ currentVideoID: id, show: true })
  };

  alreadySaved = (id) => {
    console.log(this.state.userVideos)
    if (this.state.userVideos.includes(id)) {
      return true;
    }
    else {
      return false;
    }

  }

  handleBtnSave = (videoID) => {
    for (var i = 0; i < this.state.apiResults.length; i++) {
      if (this.state.apiResults[i].id.videoId == videoID) {
        var vidToSave = this.state.apiResults[i];
      }
    }
    // event.preventDefault();
    var userID = localStorage.getItem("userID")
    if (this.alreadySaved(videoID)) {
      API.removeVideo(userID, videoID)
        .then(res => {

          this.loadUser(userID);
          console.log(res)

        })
        //console.log(this.state.users)
        .catch(err => console.log(err));
      console.log(this.state.users)
    }
    else {
      API.addVideo(userID, videoID)
        .then(res => {

          this.loadUser(userID);
          console.log(res)

        })
        //console.log(this.state.users)
        .catch(err => console.log(err));
    }
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
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  searchYoutube = query => {
    console.log(query)
    var queryState = "search";
    API.searchAPI(queryState, query)
      .then(res => {
        this.setState({ apiResults: res.data.items })
        console.log(this.state.apiResults);
        console.log(this.state.userVideos)
        this.test()
      })
      .catch(err => console.log(err));
  };

  test() {
    for (var i = 0; i < this.state.apiResults.length; i++) {
      if (this.state.userVideos.includes(this.state.apiResults[i].id.videoId)) {
        console.log("match " + this.state.apiResults[i].id.videoId)
      }
    }
  }

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
          <h1>Hi {this.state.user.username}! You are Officially A Vfriender Now :) </h1>

        </Hero>
        <br></br><br></br>
        <Container fluid>
          <Row>
            <Col size="md-6">

              <Subtitle data="Look For Your Favorite videos"></Subtitle>

              <SearchForm
                searchQuery={this.state.searchQuery}
                handleFormSubmit={this.handleFormSubmit}
                handleInputChange={this.handleInputChange}
              />


              <Modal show={this.state.show} handleClose={this.hideModal}>
                <p>Modal</p>
                <Youtube src={this.state.currentVideoID}></Youtube>
              </Modal>

              {this.state.apiResults.length ? (

                <ListItem className="video-container">

                  {this.state.apiResults.map(result => (

                    <VideoCard image={result.snippet.thumbnails.high.url}
                      title={result.snippet.title}
                      key={result.id.videoId}
                      id={result.id.videoId}
                      handleBtnPlay={this.handleBtnPlay}
                      handleBtnSave={this.handleBtnSave}
                      alreadySaved={this.alreadySaved}
                    >
                    </VideoCard>


                  ))}

                </ListItem>


              ) : (
                  <h3 className="text-white"></h3>
                )}







            </Col>
            <Col size="md-6">
              <Subtitle data="My Videos"></Subtitle>

            </Col>


          </Row>
        </Container>
      </div>
    );
  }
}

export default Search;
