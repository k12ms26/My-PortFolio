import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import modalimg from '../components/modal.jpg';
import emailjs from 'emailjs-com';
import '../App.css';

const Background = styled.div`
  width: 100%;
  height: 100%;
  // background: rgba(0, 0, 0, 0.8);
  // background-size : cover;
  position: fixed;
  display: center;
  justify-content: center;
  align-items: center;
`;

//이부분 width 다시
const ModalWrapper = styled.div`
  width: 700px;
  height: 100%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  //grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  
`;

// const ModalImg = styled.img`
//   width: 100%;
//   height: 100%;
//   border-radius: 10px 0 0 10px;
//   background: #000;
// `;

const ModalContent = styled.div`
  //display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 0
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translate(25%,25%)` : `translate(-100%,-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  function sendEmail(e) {
    e.preventDefault();
    setShowModal(prev => !prev)
    alert("전송 완료")
    emailjs.sendForm('gmail', 'template_adtnacg', e.target, 'user_m2DzYtnjmQ2Uf4uaPcU36')
        .then((result) =>{
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
}

  return (
    <>
    {showModal ? (
      <Background onClick={closeModal} ref={modalRef}>
        <animated.div style={animation}>
          <ModalWrapper showModal={showModal}>
            {/* <ModalImg src={require('./modal.jpg')} alt='camera' /> */}
            <ModalContent>
            <div>
              <div className="container">
                  <div className="mailTitle">의견을 말씀해주세요</div>
                  <form onSubmit={sendEmail}>
                      <div className="row pt-5 mx-auto">
                          <div className="col-8 form-group mx-auto">
                              <input type="text" className="name" placeholder="  Name" name="name" />
                          </div>
                          <div className="col-8 form-group pt-2 mx-auto">
                              <input type="email" className="name" placeholder="  Email Address" name="email" />
                          </div>
                          <div className="col-8 form-group pt-2 mx-auto">
                              <input type="text" className="name" placeholder="  Subject" name="subject" />
                          </div>
                          <div className="col-8 form-group pt-2 mx-auto">
                              <textarea className="sendmessage" id="" cols="30" rows="8" placeholder="  Your message" name="message"></textarea>
                          </div>
                          <div className="col-8 pt-3 mx-auto">
                              <input type="submit" className="sendbtn" value="Send Message" />
                          </div>
                      </div>
                  </form>
              </div>
          </div>
            </ModalContent>
            <CloseModalButton
              aria-label='Close modal'
              onClick={() => setShowModal(prev => !prev)}
            />
          </ModalWrapper>
        </animated.div>
      </Background>
    ) : null}
  </>
  );
};
