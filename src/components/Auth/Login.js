import React, { useState } from 'react';
import useFormValidation from './useFormValidation';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '' 
}

function Login(props) {
  const { handleSubmit, handleChange, values } = useFormValidation(INITIAL_STATE)
  const [login, setLogin] = useState(true)

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
          value={values.email}
          onChange={ (event) => handleChange(event) }
          placeholder="Your email"
          autoComplete="off"
        />
        <input 
          type="password"
          name="password"
          value={values.password}
          onChange={(event) => handleChange(event)}
          placeholder="Choose a secure password"
        />
        <div className="flex mt3">
          <button 
            type="submit" 
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
    </div>
  );
}

export default Login;
