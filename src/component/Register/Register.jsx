import "./Register.css";
import React from "react";
import { Link } from "react-router-dom";

import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Swal from "sweetalert2";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();


  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setemailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);



  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result)
  }, [email])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, email, pwd, matchPwd])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    setSuccess(true);
  }

  const klikDaftar = () => {
    const data = {
      user: user,
      email: email,
      pwd: pwd
    }

    axios.post('https://631843e9f6b281877c677851.mockapi.io/register', data)
      .then(result => {
        console.log(result.status)
        if (result.status === 201) {
          Swal.fire({
            title: "Good job!",
            text: "Berhasil Register ",
            icon: "success",
            button: "Aww yiss!",
          }).then((result) => {
            if (result.value) {
              window.location.href = `/Login`
            }
          })
        } else {
          alert('tidak berhasil register')
        }
      })
  }


  return (
    <>
      <div id="Body" className="container-fluid">
        <div className="row">
          <div className="register d-flex align-items-center py-5">
            <div className="col-lg-10 col-xl-7 mx-auto isiform">
              <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h3 className="text-center display-4">Register!</h3>

                <form onSubmit={handleSubmit} className="formregister">
                  <div className="mb-3">
                    <label htmlFor="username">
                      <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>

                      <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                      {/* <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} /> */}
                      {/*   faTimes} className={validName || !user ? "hide" : "invalid"} /> */}
                    </label>
                    <input
                      type="text"
                      placeholder="Username"
                      id="username"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      required
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      className="form-control rounded-pill border-0 shadow-sm px-4"
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />
                      4 to 24 characters.<br />
                      Must begin with a letter.<br />
                      Letters, numbers, underscores, hyphens allowed.
                    </p>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email">
                      <span className={validEmail ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>

                      <span className={validEmail || !email ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                      {/* <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} /> */}
                      {/*   faTimes} className={validName || !user ? "hide" : "invalid"} /> */}
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      //  ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                      aria-invalid={validEmail ? "false" : "true"}
                      aria-describedby="emailnote"
                      onFocus={() => setemailFocus(true)}
                      onBlur={() => setemailFocus(false)}
                      className="form-control rounded-pill border-0 shadow-sm px-4"
                    />
                    <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Invalid  your email
                    </p>
                  </div>


                  <div className="mb-3">
                    <label htmlFor="password">
                      <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>

                      <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>

                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      required
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby="pwdnote"
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />
                      8 to 24 characters.<br />
                      Must include upper and lower case letters, numbers and special characters.
                      {/* Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span> */}
                    </p>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="onfirm_pwd">
                      <span className={validMatch && matchPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>

                      <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      id="confirm_pwd"
                      onChange={(e) => setMatchPwd(e.target.value)}
                      value={matchPwd}
                      required
                      aria-invalid={validMatch ? "false" : "true"}
                      aria-describedby="confirmnote"
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                      className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must match the first password input field.
                    </p>
                  </div>
                  <div className="d-grid gap-2 mt-2">
                    <button onClick={klikDaftar} disabled={!validName || !validEmail || !validPwd || !validMatch ? true : false}
                      className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">
                      Sign Up
                    </button>
                  </div>

                  <div className="text-center d-flex justify-content-between mt-4"></div>
                  <div className="text-center">
                    <p>
                      Back To Home{" "}
                      <Link to="/" className="font-italic text-muted">
                        <u>Home</u>
                      </Link>
                    </p>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
