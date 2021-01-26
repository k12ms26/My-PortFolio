import React, {useState,useEffect} from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import ContactForm from "./components/ContextModal"
import fire from './firebaseConfig';
import AddContext from './addContext';
import Question from './question';
import styled from 'styled-components';
import { InfoModal } from './components/InfoModal';
import { GlobalStyle } from './globalStyles';
import question_mark from './image/question_mark.png';
import ShowContext from './showContext';
import {useHistory} from 'react-router';

const firebaseDb =  fire.database().ref();
function New() {
    var [contactObjects, setContactObjects] = useState({})
    var [currentId, setCurrentId] = useState('')
    const [comp, setComp] = useState(this)
    var id_result = null

    useEffect(()=>{
        firebaseDb.child('contacts').on('value',snapshot=>{
            if(snapshot.val() != null)
                setContactObjects({
                    ...snapshot.val()
                })
            else
            setContactObjects({})
        })
    }, [])

    const addOrEdit = obj => {
        if(currentId=='')
            firebaseDb.child('contacts').push(
                obj,
                err => {
                    if(err) console.log(err)
                    else setCurrentId('')
                }
            )
        else
            firebaseDb.child(`contacts/${currentId}`).set(
                obj,
                err => {
                    if(err) console.log(err)
                    else setCurrentId('')
                }
            )

    }

    const onDelete = key => {
        if(window.confirm('Are you sure to delete this record?')) {
            firebaseDb.child(`contacts/${key}`).remove(
                err => {
                    if(err) console.log(err)
                    else setCurrentId('')
                }
            )
        }
    }

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

    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
      setShowModal(prev => !prev);
    };
    // const [showModal, setShowModal] = useState(false);
    // const openModal = () => {
    //     <Question />
    // };
    const history = useHistory();
    return(
        // // <div>
        // //     <h1>New Page</h1>
        // // </div>
        // <>
            //{hasAccount ?(
            //             <>
            //                 <button onClick={handleLogin}>Sign in</button>
            //                 <p>Don't have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
            //             </>
            //         ) : (
            //             <>
            //                 <button onClick={handleSignup}>Sign up</button>
            //                 <p>Have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span> </p>
            //             </>
            //         )}
            <>
            {/* <div className="col-md-5">
                    <ContactForm {...({ addOrEdit, currentId, contactObjects })}/>
            </div> */}
            <div className="newtable">
            {/* table-borderless  */}
                <table className="table table-stripped">
                    <thead>
                        <tr>
                            {/* <th>Full Name</th>
                            <th>Mobile</th>
                            <th>Email</th> */}
                            <th>글쓴이</th>
                            <th>제목</th>
                            <th></th>
                            {/* <th>Actions</th> */}
                            <th><AddContext {...({ addOrEdit, currentId, contactObjects })}/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(contactObjects).map(id => {
                                var current = contactObjects[id]
                                var id_result = id
                                return <tr key={id}>
                                    {/* <td>{contactObjects[id].fullName}</td> */}
                                    <td>익명</td>
                                    <td>{contactObjects[id].fullName}</td>
                                    {/* <td>{contactObjects[id].email}</td> */}
                                    {/* <td>
                                         {/* <a className="btn text-primary" onClick={() => {<Question />}} data-toggle="modal" data-target="#myModal">
                                            <i className="fas fa-pencil-alt"></i>
                                        </a> */}
                                        {/* <Container>
                                            {/* <a onClick={openModal} data-toggle="modal" data-target="#myModal"><img className="question_mark" src={question_mark}></img></a> */}
                                            {/* <Button className="qnabtn" onClick={openModal}><img className="question_mark" src={question_mark}></img></Button>
                                            <InfoModal showModal={showModal} setShowModal={setShowModal} />
                                            <GlobalStyle />
                                        </Container> */} 
                                        {/* <a className="btn text-danger" onClick={() => {onDelete(id)}}>
                                            <i className="fas fa-trash-alt"></i>
                                        </a>
                                    </td> */ }
                                    <td><ShowContext {...({ addOrEdit, current, id_result })}/></td>
                                    {/* onClick={() => {history.push("/context")}}<td><Button onClick={clickgo}>글 보기</Button></td> */}
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                {/* <button onClick={()=>{setComp(Addcontext)}}>새 글 쓰기</button>
                 */}
            </div>
            
            </>
    );
}

export default New;