import React from 'react';
import Nav from './Nav';
import countword from './CountWord';
import Shop from './Shop';
import New from './New';
import AddContext from './addContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Question from './question';

const Hero = ({handleLogout}) => {
    return (
        <section className="hero">
            <Router>
                <div className="App">
                <Nav handleLogout={handleLogout}/>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/countword" component={countword} />
                    <Route path="/shop" component={Shop} />
                    <Route path="/new" component={New} />
                </Switch>
                </div>
            </Router>
            
        </section>
    )
}

const Home = () => (
    <div>
      <h1>Home Page</h1>
    </div>
)

export default Hero;