import React, { useState } from 'react';
import useFormValidation from './useFormValidation';
import firebase from '../../firebase'
import validateLogin from './validateLogin';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '' 
}

function Login(props) {
  const { 
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors, 
    isSubmitting 
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser)
  const [login, setLogin] = useState(true)
  const [firebaseError, setFirebaseError] = useState(null)

  async function authenticateUser() {
    console.log("Authenticating")
    const { name, email, password } = values
    try {
      login
      ? await firebase.login(email, password)
      : await firebase.register(name, email, password)
      props.history.push('/');
    } catch (err) {
      console.log('Authentication Error: ', err)
      setFirebaseError(err.message)
    }
  }

  return (
    <div>
      <h2 className="mv3">
        {login ? "Login" : "Create Account"}
      </h2>
      <form onSubmit={ (event) => handleSubmit(event) } className="flex flex-column">
        {!login && <input 
          type="text"
          name="name"
          value={values.name}
          onChange={(event) => handleChange(event)}
          placeholder="Your name"
          autoComplete="off"
        />}
        <input 
          type="email"
          name="email"
          onBlur={ () => handleBlur() }
          className={errors.email && 'error-input'}
          value={values.email}
          onChange={ (event) => handleChange(event) }
          placeholder="Your email"
          autoComplete="off"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input 
          type="password"
          name="password"
          onBlur={ () => handleBlur() }
          className={errors.password && 'error-input'}
          value={values.password}
          onChange={ (event) => handleChange(event) }
          placeholder="Choose a secure password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className="flex mt3">
          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
            className="button pointer mr2">
            Submit
          </button>
          <button
            type="button"
            className="button pointer mr2"
            onClick={() => setLogin(prevLogin => !prevLogin)}>
            {login ? "Need to register?" : "Already have an account?"}
          </button>
        </div>
      </form>
      <div className="forgot-password">
          <Link to="/forgot">Forgot password?</Link>
      </div>
    </div>
  );
}

export default Login;
