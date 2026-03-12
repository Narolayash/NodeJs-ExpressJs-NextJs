'use client'
import React, { useState } from 'react';
import '../../styles/login.css';

function LoginUser() {
    const [showModal, setShowModal] = useState(false);
    const [remember, setRemember] = useState(true);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    return (
        <>
            <button onClick={handleShowModal}>
                Login
            </button>

            {showModal && (
                <div id="id01" className="modal">
                    <span
                        onClick={handleCloseModal}
                        className="close"
                        title="Close Modal"
                        style={{ cursor: 'pointer', fontSize: '2rem' }}
                    >
                        &times;
                    </span>

                    <form className="modal-content animate" action="/action_page.php">
                        <div className="imgcontainer">
                            <img src="img_avatar2.png" alt="Avatar" className="avatar" />
                        </div>

                        <div className="container">
                            <label htmlFor="uname"><b>Username</b></label>
                            <input type="text" placeholder="Enter Username" name="uname" required />

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="psw" required />

                            <button type="submit">Login</button>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    name="remember"
                                    onChange={() => setRemember(!remember)}
                                /> Remember me
                            </label>
                        </div>

                        <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="cancelbtn"
                            >
                                Cancel
                            </button>
                            <span className="psw">Forgot <a href="#">password?</a></span>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default LoginUser;