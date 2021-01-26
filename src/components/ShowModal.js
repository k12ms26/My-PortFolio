import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import '../App.css'
import fire from '../firebaseConfig'
import firebase from 'firebase'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
  display: grid;
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
  justify-content: center;
  align-items: center;
  width : 150%;
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
    transform: showModal ? `translate(-105%, -25%)` : `translate(-100%,-100%)`
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
        firebaseDb.child(`contacts/${key}`).remove(
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
    name: ''
  }

  const [activity, setActivity] = useState(defaultActivity);

  const handleChange = e => {
    const { name, value } = e.target
    setActivity({
      ...activity,
      [name]: value
    });
  }
  const isValid = activity.name === '';
  const updates = {};
  //updates['contacts/' + id + '/' + ]
  const handleSubmit = () => {
    firebase.database().ref("contacts").child(id).child("commit").push(activity);
    setActivity(defaultActivity);
    // Show notification

  }
  console.log(current)

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              {/* <ModalImg src={require('./modal.jpg')} alt='camera' /> */}
              <ModalContent>
                {/* <h1>Are you ready?</h1>
                <p>Get exclusive access to our next launch.</p>
                <button>Join Now</button> */}
                <div>
                  <div>
                    {current.fullName}
                  </div>
                  <div>
                    {current.address}
                  </div>
                  {/* <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead> */}
                        {/* <tbody>
                            {
                                Object.keys(contactObjects).map(id => {
                                    console.log(id)
                                    return <tr key={id}>
                                        <td>{contactObjects[id].fullName}</td>
                                        <td>{contactObjects[id].mobile}</td>
                                        <td>{contactObjects[id].email}</td>
                                        <td> */}
                                            {/* <a className="btn text-primary" onClick={() => {setCurrentId(id)}}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a> */}
                                            {/* <a className="btn text-danger" onClick={() => {onDelete(id)}}>
                                                <i className="fas fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table> */}
                    {/* <form autoComplete="off">
                      <div className="addComment">
                        <text className="formtext">댓글</text>
                        <input className="addtext" name="fullName" value={current.email} onChange={handleInputChange}/>
                        <button className="addbtn">등록</button>
                      </div>
                    </form> */}
                  <button onClick={() => { onDelete(id) }}>
                    글 삭제
                      </button>

                  <TextField
                    style={{ marginTop: '5px' }}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="댓글"
                    value={activity.name}
                    name="name"
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isValid}
                  >
                    저장
                  </Button>
                  <div>
                    <table className="commit-table">
                      
                      <tbody>
                        {
                          Object.keys(commitObjects).map(uid => {
                            return <tr key={uid}>
                              <td>{commitObjects[uid].name}</td>
                            </tr>
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* <table className="table table-borderless table-stripped">
                    <thead className="thead-light">
                        <tr>
                            <th>Full Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Address</th> */}
                {/* <th>Actions</th> */}
                {/* <th><AddContext {...({ addOrEdit, currentId, contactObjects })}/></th> */}
                {/* </tr>
                    </thead>
                    <tbody>
                        {
                          <tr>
                            <td>{current.fullName}</td>
                            <td>{current.mobile}</td>
                            <td>{current.email}</td>
                            <td>{current.address}</td>
                            <td> */}
                {/* <a className="btn text-primary" onClick={() => {setCurrentId(current)}} data-toggle="modal" data-target="#myModal">
                                        <i className="fas fa-pencil-alt"></i>
                                    </a> */}
                {/* <Container>
                                        <a onClick={openModal} data-toggle="modal" data-target="#myModal"><img className="question_mark" src={question_mark}></img></a>
                                        <Button className="qnabtn" onClick={openModal}><img className="question_mark" src={question_mark}></img></Button>
                                        <InfoModal showModal={showModal} setShowModal={setShowModal} />
                                        <GlobalStyle />
                                    </Container>  */}
                {/* <a className="btn text-danger" onClick={() => {onDelete(id)}}>
                                        <i className="fas fa-trash-alt"></i>
                                    </a> */}
                {/* </td>
                          </tr> */}

                {/* Object.keys(contactObjects).map(id =>  */}
                {
                        //     return <tr key={id}>
                        //         <td>{contactObjects[id].fullName}</td>
                        //         <td>{contactObjects[id].mobile}</td>
                        //         <td>{contactObjects[id].email}</td>

                        //         {/* <td><ShowContext {...({ addOrEdit, currentId, contactObjects })}/></td> */}
                        //     </tr>
                        // })

                //         }
                //     </tbody>
                // </table>
                /* <button onClick={()=>{setComp(Addcontext)}}>새 글 쓰기</button>
                 */}
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
