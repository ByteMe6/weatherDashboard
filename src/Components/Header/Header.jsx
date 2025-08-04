import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import cont from "../Container/Container.module.scss";
import style from "./Header.module.scss";

import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from "./firebase";

export function Header({ onLogout }) {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const auth = getAuth(app);

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(`.${style.mobileMenu}`) && !event.target.closest(`.${style.burgerMenu}`)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleOpenUserModal = () => setShowUserModal(true);
  const handleCloseUserModal = () => setShowUserModal(false);

  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
    setIsRegister(false);
    setIsMobileMenuOpen(false);
  };

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    setEmail("");
    setPassword("");
    setDisplayName("");
    setEmailError("");
    setLoading(false);
    setIsRegister(false);
  };


  const handleGoogleAuth = async () => {
    setLoading(true);
    setEmailError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setShowLoginModal(false);
    } catch (err) {
      setEmailError("Google authentication error: " + (err.message || "Please try again"));
    }
    setLoading(false);
  };


  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEmailError("");
    if (!email || !password) {
      setEmailError("Please fill in all fields");
      setLoading(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowLoginModal(false);
      setEmail("");
      setPassword("");
    } catch (err) {
      let msg = "Sign in error: ";
      if (err.code === "auth/user-not-found") msg += "User not found";
      else if (err.code === "auth/wrong-password") msg += "Incorrect password";
      else msg += err.message || "Please try again";
      setEmailError(msg);
    }
    setLoading(false);
  };


  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEmailError("");
    if (!email || !password || !displayName) {
      setEmailError("Please fill in all fields");
      setLoading(false);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      setShowLoginModal(false);
      setEmail("");
      setPassword("");
      setDisplayName("");
    } catch (err) {
      let msg = "Registration error: ";
      if (err.code === "auth/email-already-in-use") msg += "Email already in use";
      else if (err.code === "auth/weak-password") msg += "Weak password (minimum 6 characters)";
      else msg += err.message || "Please try again";
      setEmailError(msg);
    }
    setLoading(false);
  };


  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      if (onLogout) onLogout();
      setIsMobileMenuOpen(false);
    } catch (err) {
      console.error('Logout error:', err);
    }
    setLoading(false);
  };

  return (
    <header className={cont.container}>
      <button 
        className={`${style.burgerMenu} ${isMobileMenuOpen ? style.active : ''}`}
        onClick={handleToggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <div className={style.burgerLine}></div>
        <div className={style.burgerLine}></div>
        <div className={style.burgerLine}></div>
      </button>

      <nav className={style.nav} data-aos="fade-down">
        <img src="./logo.png" alt="" data-aos="zoom-in" data-aos-delay="100" />
        <ul className={style.links}>
          <li
            className={style.linkListItem}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Who we are3
          </li>
          <li
            className={style.linkListItem}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Contacts
          </li>
          <li
            className={style.linkListItem}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Menu
          </li>
        </ul>
      </nav>
      <ul className={style.logInHeader}>
        {!auth.currentUser ? (
          <li
            className={style.LogInHeaderItem}
            data-aos="fade-left"
            data-aos-delay="500"
          >
            <button
              type="button"
              className="btn btn-warning"
              style={{
                fontSize: window.innerWidth <= 480 ? "12px" : window.innerWidth <= 768 ? "14px" : "16px",
                padding: window.innerWidth <= 480 ? "6px 12px" : window.innerWidth <= 768 ? "8px 16px" : "10px 20px"
              }}
              onClick={handleOpenLoginModal}
            >
              Sign In
            </button>
          </li>
        ) : (
          <>
            <li
              className={style.LogInHeaderItem}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <button
                type="button"
                className="btn btn-warning me-2"
                style={{
                  fontSize: window.innerWidth <= 480 ? "12px" : window.innerWidth <= 768 ? "14px" : "16px",
                  padding: window.innerWidth <= 480 ? "6px 12px" : window.innerWidth <= 768 ? "8px 16px" : "10px 20px"
                }}
                onClick={handleLogout}
                disabled={loading}
              >
                Sign Out
              </button>
            </li>
            <li
              className={style.LogInHeaderItem}
              data-aos="fade-left"
              data-aos-delay="700"
            >
              <button type="button" className="btn" onClick={handleOpenUserModal}>
                <img
                  src="./user.png"
                  alt="User Avatar"
                  style={{ 
                    width: window.innerWidth <= 480 ? "28px" : window.innerWidth <= 768 ? "30px" : "32px", 
                    height: window.innerWidth <= 480 ? "28px" : window.innerWidth <= 768 ? "30px" : "32px", 
                    borderRadius: "50%" 
                  }}
                />
              </button>
            </li>
          </>
        )}
      </ul>

      {showLoginModal && (
        <div
          className="modal show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1050,
          }}
          tabIndex="-1"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ 
              maxWidth: window.innerWidth <= 480 ? "95%" : window.innerWidth <= 768 ? "90%" : 400, 
              margin: "auto",
              padding: "0 10px"
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isRegister ? "Registration" : "Sign In"}</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCloseLoginModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <button
                  type="button"
                  className="btn btn-warning mb-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: "100%", 
                    gap: "8px",
                    fontSize: window.innerWidth <= 480 ? "14px" : "16px",
                    padding: window.innerWidth <= 480 ? "8px 12px" : "12px 16px"
                  }}
                  onClick={handleGoogleAuth}
                  disabled={loading}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fillRule="evenodd">
                      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                    </g>
                  </svg>
                  {isRegister ? "Sign up with Google" : "Sign in with Google"}
                </button>
                <div className="mb-2" style={{ fontWeight: 500 }}>or</div>
                <form onSubmit={isRegister ? handleEmailRegister : handleEmailLogin}>
                  {isRegister && (
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                        disabled={loading}
                        autoComplete="name"
                      />
                    </div>
                  )}
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      disabled={loading}
                      autoComplete="username"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      disabled={loading}
                      autoComplete={isRegister ? "new-password" : "current-password"}
                    />
                  </div>
                  {emailError && (
                    <div className="alert alert-danger py-1" style={{ 
                      fontSize: window.innerWidth <= 480 ? "12px" : "14px",
                      padding: window.innerWidth <= 480 ? "6px 8px" : "8px 12px"
                    }}>
                      {emailError}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    style={{ 
                      width: "100%",
                      fontSize: window.innerWidth <= 480 ? "14px" : "16px",
                      padding: window.innerWidth <= 480 ? "8px 12px" : "12px 16px"
                    }}
                    disabled={loading}
                  >
                    {loading
                      ? (isRegister ? "Signing up..." : "Signing in...")
                      : (isRegister ? "Sign up" : "Sign in with Email")}
                  </button>
                </form>
                <div className="mt-3">
                  {isRegister ? (
                    <span>
                      Already have an account?{" "}
                                              <button
                          type="button"
                          className="btn btn-link p-0"
                          style={{ 
                            fontSize: window.innerWidth <= 480 ? "13px" : "15px"
                          }}
                          onClick={() => {
                            setIsRegister(false);
                            setEmailError("");
                          }}
                          disabled={loading}
                        >
                        Sign In
                      </button>
                    </span>
                  ) : (
                    <span>
                      No account?{" "}
                      <button
                        type="button"
                        className="btn btn-link p-0"
                        style={{ 
                          fontSize: window.innerWidth <= 480 ? "13px" : "15px"
                        }}
                        onClick={() => {
                          setIsRegister(true);
                          setEmailError("");
                        }}
                        disabled={loading}
                      >
                        Sign Up
                      </button>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showUserModal && (
        <div
          className="modal show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1050,
          }}
          tabIndex="-1"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ 
              maxWidth: window.innerWidth <= 480 ? "95%" : window.innerWidth <= 768 ? "90%" : 400, 
              margin: "auto",
              padding: "0 10px"
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Information</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCloseUserModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <div className="mb-2">
                  <strong>Name:</strong>{" "}
                  {auth.currentUser && auth.currentUser.displayName ? auth.currentUser.displayName : "No information"}
                </div>
                <div>
                  <strong>Email:</strong>{" "}
                  {auth.currentUser && auth.currentUser.email ? auth.currentUser.email : "No information"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className={`${style.mobileMenu} ${isMobileMenuOpen ? style.active : ''}`}>
          <button 
            className={style.closeButton}
            onClick={handleCloseMobileMenu}
            aria-label="Close mobile menu"
          >
            ✕
          </button>
          
          <div className={style.mobileLinks}>
            <a href="#" className={style.mobileLink} onClick={handleCloseMobileMenu}>
              Who we are
            </a>
            <a href="#" className={style.mobileLink} onClick={handleCloseMobileMenu}>
              Contacts
            </a>
            <a href="#" className={style.mobileLink} onClick={handleCloseMobileMenu}>
              Menu
            </a>
          </div>
          
          <div className={style.mobileAuth}>
            {!auth.currentUser ? (
              <button
                className="btn btn-warning"
                onClick={handleOpenLoginModal}
              >
                Sign In
              </button>
            ) : (
              <>
                <button
                  className="btn btn-outline-warning"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  Sign Out
                </button>
                <button
                  className="btn btn-warning"
                  onClick={handleOpenUserModal}
                >
                  Account
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}