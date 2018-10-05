import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import "./Login.css";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Nav from "../../components/Nav";
class Home extends Component {
  // Setting our component's initial state
  state = {
    users: [],
    realname: "",
    photo: "",
    gender: "",
    password: "",

  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadBooks();
  }

  // Loads all books  and sets them to this.state.books
  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ username: "", realname: "", photo: "", gender: "",
        password: "", })
      )
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

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    localStorage.clear()
    event.preventDefault();
    console.log("username: "+this.state.username +" pass: "+ this.state.password);
    localStorage.setItem("username", this.state.username)
    if (this.state.username && this.state.password) {
      API.getBookName(this.state.username)
      .then(res => { 
        
        this.setState({ users: res.data })
        console.log(this.state.users)
        localStorage.setItem("userID", this.state.users._id)
        console.log(localStorage.getItem("userID"))
        window.location.href = "/home"
      })
      //console.log(this.state.users)
      .catch(err => console.log(err));
      console.log(this.state.users)
    }
    
  };

  render() {
    return (
      <Container fluid>
        
        <Row>
          <Col size="md-4"></Col>
          <Col size="md-4">
            <Jumbotron>
              <h1 className="text-center text-white formTitle">Login</h1>
              <hr></hr>
            <form>
              <Input
                value={this.state.username}
                onChange={this.handleInputChange}
                name="username"
                placeholder="username (required)"
              />
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="password (required)"
              />
            
              <FormBtn  className={
            window.location.pathname === "/home"
                
          }     
          onClick={this.handleFormSubmit}
        //  // linkTo = "/home"
          disabled={!(this.state.username && this.state.password)}
                             >
                Submit
              </FormBtn>

            </form>
            <Link to="/register" className="nav-link text-white" >
            Register
          </Link>
          </Jumbotron>
          </Col>
          <Col size="md-4"></Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
