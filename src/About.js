import React, { Component } from 'react';
import './App.css';

export default class About extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: ""
        }
    }
    // state = {
    //     value: null
    // };

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
                    <textarea value={value} onChange={this.handleChange}></textarea>
                </form>
                <br></br>
                <input type="number" id="result" readOnly value={value.length}></input><text>자</text>
            </>
        );
    }
}

// function calc() {
//     // document.getElementById('result') = 
// }

//export default About;