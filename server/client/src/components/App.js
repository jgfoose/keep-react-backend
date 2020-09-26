import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Home from "./Home";
import Nav from "./Nav";

const Landing = () => <h1>Please Sign In</h1>;

class Card {
  constructor(id, items) {
    this.id = id;
    this.items = [];
    this.header = "";
    this.color = "";
    this.label = "";
  }
}

class App extends Component {
  //Cards will be stored in local storage and retrieved on page refresh
  getLocalStorage = () => {
    let storedCards = JSON.parse(window.localStorage.getItem("cards"));
    let storedLabels = JSON.parse(window.localStorage.getItem("labels"));
    let loadedCards = [];

    //If there are stored cards, create populate loaded cards arrary
    if (storedCards !== null) {
      for (var i = 0; i < storedCards.length; i++) {
        let storedCard = storedCards[i];
        let thisCard = new Card(i);
        thisCard.id = i;
        thisCard.items = storedCard.items;
        thisCard.header = storedCard.header;
        thisCard.color = storedCard.color;
        thisCard.label = storedCard.label;
        loadedCards.push(thisCard);
        this.prevCardId = i + 1;
      }
      window.localStorage.clear();
      window.localStorage.setItem("cards", JSON.stringify(loadedCards));
      window.localStorage.setItem("labels", JSON.stringify(storedLabels));
    }

    //If labels, update state
    if (storedLabels !== null) {
      this.setState({
        labels: storedLabels,
      });
    }

    //if cards, update state, else default card will be loaded
    if (loadedCards.length > 0) {
      this.setState({
        cards: loadedCards,
      });
    }
  };

  //card id counter
  prevCardId = 1;

  //fetch local storage on page load
  componentDidMount() {
    this.getLocalStorage();
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Nav />
          <Route exact path="/" component={this.props.auth ? Home : Landing} />
          <Route path="/reactKeep" component={Home} />
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
