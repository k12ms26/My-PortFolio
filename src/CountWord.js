import React, { Component } from 'react';
import './App.css';

export default class About extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            value : e.target.value
        });
    }
    render(){
        const { value } = this.state;
        return(
            <>
                <br></br>
                <form>
                    <textarea className="countword" value={value} onChange={this.handleChange}></textarea>
                </form>
                <br></br>
                <input className="word" id="result" readOnly value={value.length}></input><text className="wordza">자</text>
            </>
        );
    }
}

// function calc() {
//     // document.getElementById('result') = 
// }

//export default About;
