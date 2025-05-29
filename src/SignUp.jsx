import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // make sure the path is correct
import Navbar from './navbar';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert(`Successfully signed up with ${user.email}`);
      setEmail('');
      setPassword('');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="envelope-wrapper">
          <div className={`envelope ${isOpen ? 'open' : ''}`}>
            {/* Envelope Body */}
            <div className="envelope-body">
              <div className="form-content">
                <h2>Create Account</h2>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button onClick={handleSubmit} className="submit-btn">
                  Sign Up
                </button>
              </div>
            </div>

            {/* Envelope Flap */}
            <div className="envelope-flap" onClick={() => setIsOpen(!isOpen)}>
              <div className="heart">♡</div>
            </div>
          </div>

          {!isOpen && <p className="hint">Click the envelope to sign up</p>}
        </div>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5e6d8 0%, #fdf2f8 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          padding: 20px;
        }

        .envelope-wrapper {
          position: relative;
        }

        .envelope {
          position: relative;
          width: 380px;
          height: 240px;
          transition: all 0.4s ease;
          filter: drop-shadow(0 8px 32px rgba(233, 30, 99, 0.15));
        }

        .envelope:hover {
          transform: translateY(-2px);
          filter: drop-shadow(0 12px 40px rgba(233, 30, 99, 0.2));
        }

        .envelope-body {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(145deg, #fdf2f8 0%, #fce7f3 100%);
          border: 2px solid #f8bbd9;
          border-radius: 12px;
          overflow: hidden;
          z-index: 1;
        }

        .envelope-flap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 120px;
          background: linear-gradient(145deg, #ec4899 0%, #f472b6 100%);
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          cursor: pointer;
          z-index: 3;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          transform-origin: 50% 0%;
          padding-top: 25px;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }

        .envelope.open .envelope-flap {
          transform: rotateX(-180deg);
        }

        .heart {
          color: #fdf2f8;
          font-size: 24px;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }

        .form-content {
          position: absolute;
          top: 60px;
          left: 20px;
          right: 20px;
          bottom: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease 0.3s;
        }

        .envelope.open .form-content {
          opacity: 1;
          transform: translateY(0);
        }

        h2 {
          margin: 0 0 16px 0;
          text-align: center;
          color: #be185d;
          font-weight: 600;
          font-size: 18px;
          letter-spacing: -0.5px;
        }

        .input-group {
          margin-bottom: 12px;
        }

        input {
          width: 325px;
          padding: 6px 10px;
          border: 2px solid #f8bbd9;
          border-radius: 6px;
          font-size: 13px;
          background: #fffbfe;
          color: #831843;
          transition: all 0.3s ease;
        }

        input:focus {
          outline: none;
          border-color: #ec4899;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
        }

        input::placeholder {
          color: #d946ef;
          opacity: 0.7;
        }

        .submit-btn {
          width: 120px;
          padding: 8px 12px;
          background: linear-gradient(145deg, #ec4899 0%, #f472b6 100%);
          color: #fdf2f8;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 4px auto 0 auto;
          letter-spacing: 0.5px;
          align-self: center;
        }

        .submit-btn:hover {
          background: linear-gradient(145deg, #db2777 0%, #ec4899 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(236, 72, 153, 0.3);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .hint {
          text-align: center;
          margin-top: 20px;
          color: #be185d;
          font-size: 14px;
          opacity: 0.8;
          font-weight: 500;
        }

        @media (max-width: 480px) {
          .envelope {
            width: 320px;
            height: 200px;
          }

          .envelope-flap {
            height: 100px;
            padding-top: 20px;
          }

          .form-content {
            top: 50px;
            left: 16px;
            right: 16px;
            bottom: 16px;
          }

          h2 {
            font-size: 20px;
            margin-bottom: 20px;
          }

          input,
          .submit-btn {
            padding: 12px 16px;
            font-size: 14px;
          }

          .input-group {
            margin-bottom: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default SignUp;
