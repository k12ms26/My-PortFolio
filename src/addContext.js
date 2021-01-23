import React, {useState,useEffect} from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ContextModal } from './components/ContextModal';
import { GlobalStyle } from './globalStyles';
import './App.css';
import plus_mark from './image/plus_mark.png';

const Container = styled.div`
  display: center;
  justify-content: center;
  align-items: center;
  //height: 100vh;
  height : 50%;
  width : 40%;
  text-align : center;
  // vertical-align: middle;
`;

const Button = styled.button`
//min-width: 50px;
  width : 80px;
  padding: 16px 32px;
  // border-radius: 4px;
  border: none;
  background: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;


const AddContext = (props) => {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(prev => !prev);
    };
    return(
        <>
            <Container>
                <a onClick={openModal} data-toggle="modal" data-target="#myModal"><img className="plus_mark" src={plus_mark}></img><br></br>새 글 쓰기</a>
                {/* <Button className="qnabtn" onClick={openModal}><img className="plus_mark" src={plus_mark}></img></Button> */}
                <ContextModal showModal={showModal} setShowModal={setShowModal} addOrEdit={props.addOrEdit} currentId={props.currentId} contactObjects={props.contactObjects}/>
                <GlobalStyle />
            </Container>
        </>
    );
}

export default AddContext;


// function New() {
//   const [showModal, setShowModal] = useState(false);

//   const openModal = () => {
//     setShowModal(prev => !prev);
//   };

//   return (
//     <>
//       <Container>
//         <a onClick={openModal} data-toggle="modal" data-target="#myModal"><img className="question_mark" src={question_mark}></img></a>
//         {/* <Button className="qnabtn" onClick={openModal}><img className="question_mark" src={question_mark}></img></Button> */}
//         <Modal showModal={showModal} setShowModal={setShowModal} />
//         <GlobalStyle />
//       </Container>
//     </>
//   );
// }

// export default New;
