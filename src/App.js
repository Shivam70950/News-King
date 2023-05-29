import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  //render is a life cycle method react jb ek component ko load krti h tb kuch series of methods run krte h iska kaam hhota h sbse phle JSX ko html m convert krna or fir screen pe html ko render krna
  pageSize = 5;
  apikey=process.env.REACT_APP_NEWS_API

  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({
      progress:progress
    })
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          height={3}
            color='#f11946'
            progress={this.state.progress}
          />

          <Routes>
            <Route
              exact path="/" element={<News setProgress={this.setProgress} apikey={this.apikey} pageSize={this.pageSize} country="in" category="general" />}>
            </Route>
            <Route
              exact path="/home" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={this.pageSize} country="in" category="general" />}>
            </Route>
            <Route
              exact path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} key="business" pageSize={this.pageSize} country="in" category="business" />}>
            </Route>
            <Route
              exact path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />}>
            </Route>
            <Route
              exact path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize={this.pageSize} country="in" category="health" />}>
            </Route>
            <Route
              exact path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" pageSize={this.pageSize} country="in" category="science" />}>
            </Route>
            <Route
              exact path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" pageSize={this.pageSize} country="in" category="sports" />}>
            </Route>
            <Route
              exact path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key="technology" pageSize={this.pageSize} country="in" category="technology" />}>
            </Route>

          </Routes>
        </Router>
      </div>
    )
  }
}
// key use ki remont k liye
