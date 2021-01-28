import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import '../App.css'
import fire from '../firebaseConfig'
import firebase from 'firebase'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Draggable, {} from 'react-draggable';

const Background = styled.div`
  width: 100%;
  height: 100%;
  // background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  // display: grid;
  grid-template-columns: 1fr 1fr;
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
  display: absolute;
  flex-direction: column;
  width : 100%;
  height : 100%;
  align-self : center;
  line-height: 1.8;
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

const firebaseDb = fire.database().ref();
export const ShowModal = ({ showModal, setShowModal, addOrEdit, current, id }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 0
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translate(-180%, -80%)` : `translate(-100%,-100%)`
    // transform: showModal ? `translateY(0%)` : `translateY(-100%)`
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

  const initialFieldValues = {
    fullName: '',
    mobile: '',
    email: [],
    address: '',
  }

  var [values, setValues] = useState(initialFieldValues)

  // useEffect(() => {
  //     if(props.currentId=='')
  //         setValues({
  //             ...initialFieldValues
  //         })
  //     else
  //         setValues({
  //             ...props.contactObjects[props.currentId]
  //         })

  // }, [props.currentId, props.contactObjects])

  const handleInputChange = e => {
    var { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    // aria-label='Close modal'
    setShowModal(prev => !prev)
    addOrEdit(values);
    alert("글 쓰기 완료");
  }
  var [contactObjects, setContactObjects] = useState({})
  var [commitObjects, setCommitObjects] = useState({})
  var [currentId, setCurrentId] = useState('')
  const [comp, setComp] = useState(this)

  useEffect(() => {
    firebaseDb.child('contacts').on('value', snapshot => {
      if (snapshot.val() != null)
        setContactObjects({
          ...snapshot.val()
        })
      else
        setContactObjects({})
    })
  }, [])

  useEffect(() => {
    firebaseDb.child('contacts').child(id).child('commit').on('value', snapshot => {
      if (snapshot.val() != null)
        setCommitObjects({
          ...snapshot.val()
        })
      else
        setCommitObjects({})
    })

  }, [])

  // const addOrEdit = obj => {
  //     if(currentId=='')
  //         firebaseDb.child('contacts').push(
  //             obj,
  //             err => {
  //                 if(err) console.log(err)
  //                 else setCurrentId('')
  //             }
  //         )
  //     else
  //         firebaseDb.child(`contacts/${currentId}`).set(
  //             obj,
  //             err => {
  //                 if(err) console.log(err)
  //                 else setCurrentId('')
  //             }
  //         )

  // }
  const onDelete = key => {
    if (window.confirm('글을 삭제하시겠습니까?')) {
      var input = prompt("비밀번호를 입력하세요")
      if (input == contactObjects[key].mobile) {
        firebaseDb.child(`contacts/${id}/commit/${key}`).remove(
          err => {
            if (err) console.log(err)
            else setCurrentId('')
          }
        )
        alert("삭제 완료")
      }
      else {
        alert("비밀번호가 틀립니다")
      }
    }
  }

  //이부분!!!!!!
  const onDeleteComment = key => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      var input = prompt("비밀번호를 입력하세요")
      if (input == commitObjects[key].password) {
        firebaseDb.child(`contacts/${id}/commit/${key}`).remove(
          err => {
            if (err) console.log(err)
            else setCurrentId('')
          }
        )
        alert("삭제 완료")
      }
      else {
        alert("비밀번호가 틀립니다")
      }
    }
  }



  const defaultActivity = {
    name: '',
    password: ''
  }

  const [activity, setActivity] = useState(defaultActivity);
  // const [activitypwd, setActivitypwd] = useState(defaultActivity);

  const handleChange = e => {
    const { name, value } = e.target
    setActivity({
      ...activity,
      //...activitypwd,
      [name]: value
    });
  }
  const isValid = activity.name === '';
  const updates = {};
  //updates['contacts/' + id + '/' + ]
  const handleSubmit = () => {
    if(activity.password == '') {
      alert("비밀번호를 입력하세요")
    }
    else {
      firebase.database().ref("contacts").child(id).child("commit").push(activity);
      setActivity(defaultActivity);
    }
    // Show notification

  }

  return (
    <>
      {showModal ? (
        <Draggable>
          <Background onClick={closeModal} ref={modalRef}>
            <animated.div style={animation}>
              <ModalWrapper showModal={showModal}>
                {/* <ModalImg src={require('./modal.jpg')} alt='camera' /> */}
                <ModalContent>
                  {/* <h1>Are you ready?</h1>
                  <p>Get exclusive access to our next launch.</p>
                  <button>Join Now</button> */}
                  <br></br>
                  <div>
                    <div className="showtitle">
                      <div className="title">
                        제목
                      </div>
                      {current.fullName}
                      <a className="trash" onClick={() => onDelete(id)}>
                      <i className="fas fa-trash-alt"></i>
                      </a>
                    </div>
                    <br></br>
                    <div className="showcontent">
                      {current.address}
                    </div>
                    <br></br>
                    <div className="comments">
                      <div>
                        <text className="showshowcomment">댓글</text>
                        <input className="showtext" name="name" value={activity.name} onChange={handleChange}/>
                        <text className="showcommentpwd">비밀번호</text>
                        <input className="showpwdtext" name="password" value={activity.password} onChange={handleChange}/>
                      </div>
                      <div>

                      </div>
                    </div>

                    <Button
                      style={{ marginTop: '1%', width:'80%' }}
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={isValid}
                      className="showadd"
                    >
                      저장
                    </Button>
                    <div>
                      <table className="commit-table">
                        <tbody>
                          {
                            Object.keys(commitObjects).map(uid => {
                              return <tr key={uid}>
                                <td className="showname">익명</td>
                                <td className="showcom">{commitObjects[uid].name}</td>
                                <td>
                                  <a className="trashcomment" onClick={() => onDeleteComment(uid)}>
                                    <i className="fas fa-trash-alt"></i>
                                  </a>
                                </td>
                              </tr>
                            })
                          }
                        </tbody>
                      </table>
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
        </Draggable>

      ) : null}
    </>
  );
};
