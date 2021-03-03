import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Create from "./Create";
import Nav from "./Nav";
import SinglePost from "./SinglePost";
import UpdatePost from "./UpdatePost";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="container pb-5">
          <Nav />
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/create" component={Create} />
          <Route path="/post/:slug" exact component={SinglePost} />
          <Route path="/post/update/:slug" exact component={UpdatePost} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
