import React from 'react';
import { Modal, Tab, Nav } from 'react-bootstrap';
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';

const CustomModal = ({ showModal, setShowModal }) => {
    return (
        <Modal
            size='lg'
            show={showModal}
            onHide={() => setShowModal(false)}
            aria-labelledby='signup-modal'

        >
            {/* tab container to do either signup or login component */}
            <Tab.Container defaultActiveKey='login' >
                <Modal.Header className='modalHeader' style={{ backgroundColor: "#05004E" }}>
                    <Modal.Title id='signup-modal' >
                        <Nav variant='pills' style={{ position: "relateve" }} >
                            <Nav.Item>
                                <Nav.Link style={{ backgroundColor: "#FD5F00", borderRadius: "50px" }} eventKey='login'>Login</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link style={{ marginLeft: "10px", backgroundColor: "#FD5F00", borderRadius: "50px" }} eventKey='signup'>Sign Up</Nav.Link>
                            </Nav.Item>
                            {/* <div><img src={star} style={{ width: "100%", height: "auto", marginLeft: "30px" }} alt="star" /></div> */}

                            <Nav.Item  >
                                <Nav.Link style={{ color: "white", position: "absolute", top: "0", right: "5px" }} onClick={() => setShowModal(false)}>X</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#05004E" }}>
                    <Tab.Content>
                        <Tab.Pane eventKey='login'>
                            <LoginForm handleModalClose={() => setShowModal(false)} />
                        </Tab.Pane>
                        <Tab.Pane eventKey='signup'>
                            <SignUpForm handleModalClose={() => setShowModal(false)} />
                        </Tab.Pane>
                    </Tab.Content>
                </Modal.Body>
            </Tab.Container>
        </Modal>
    );
};

export default CustomModal;