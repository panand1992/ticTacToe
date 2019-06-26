import React, {Component, Suspense, lazy} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

const Home =  lazy(() => import('./templates/home.jsx'));

class Customrouter extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading ...</div>}>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default Customrouter;