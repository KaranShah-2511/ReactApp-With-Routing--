import React from 'react';
import Routes from './Core/Components/Routes';
import routes from './Config/Routes';
import { Auth } from './Core/Services/AuthService';
import { useLocation } from 'react-router-dom';


function App() {
  const auth = Auth;
  const location = useLocation();
  return (

    <Routes
      location={location}
      redirect="/login"
      routes={[...routes['app'], ...routes['comman']]}
      isAuthorized={auth.isAuthorized()}
      // isAuthorized={true}
      notFound="/404"
    />
  );
}

export default App;
