import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiSearchLine } from 'react-icons/ri';
import { Col, Form, Row, Button, Spinner, ToastContainer, Toast } from 'react-bootstrap';
import { Auth } from '../../Core/Services/AuthService';
import './Navigation.scss'

function Navigation() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    console.log('hello', e)
  }
  const handelAction = () => {

    Auth.logout()
      .then(() => {
        navigate('/login/');
      });
  };


  return (
    <div className='navigation'>
      <h4>SKMedia</h4>

      <div className='nav-item'>
        <ul>
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/">History</Link>
          </li>
        </ul>
      </div>
      <div>
        <Button onClick={ () => handelAction()}>LogOut</Button>
      </div>

    </div>
  )
}

export default Navigation
