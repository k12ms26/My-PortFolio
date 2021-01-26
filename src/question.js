import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from './components/Modal';
import { GlobalStyle } from './globalStyles';
import './App.css';
import question_mark from './image/question_mark.png';

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
  min-width: 100px;
  padding: 16px 32px;
  // border-radius: 4px;
  border: none;
  background: #603bbb;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

function New() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>
      <Container>
        <a onClick={openModal} data-toggle="modal" data-target="#myModal"><img className="question_mark" src={question_mark}></img></a>
        {/* <Button className="qnabtn" onClick={openModal}><img className="question_mark" src={question_mark}></img></Button> */}
        <Modal showModal={showModal} setShowModal={setShowModal} />
        <GlobalStyle />
      </Container>
    </>
  );
}

export default New;