import React from 'react';
import Nav from './Nav';
import countword from './CountWord';
import Shop from './Shop';
import New from './New';
import AddContext from './addContext';
import ShowModal from './components/ShowModel'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Question from './question';
import ImageSlider from './components/ImageSlider';
import {SliderData} from './components/SliderData'
import Footer from './common/footer';
import NotFound from './components/notFound'

const Hero = (props) => {
    console.log(props.handleLogout)
    return (
        <section className="hero">
            <Router>
                <div className="App">
                <Nav handleLogout={props.handleLogout} name={props.email_login}/>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/countword" component={countword} />
                    <Route path="/shop" component={Shop} />
                    <Route path="/new" component={New} />
                    <Route path="/context" component={ShowModal} />
                    <Route path = "/*" component = {NotFound} />
                </Switch>
                </div>
            </Router>
        </section>
    )
}

const Home = () => (
    <div>
      <ImageSlider slides={SliderData} />;
      <Footer />
    </div>
)

export default Hero;