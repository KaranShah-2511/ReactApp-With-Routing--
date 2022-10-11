import React from 'react';
import Routes from './Core/Components/Routes';
import routes from './Config/Routes';
import { Auth } from './Core/Services/AuthService';
import { useLocation } from 'react-router-dom';
import { Navigation } from './Component';


function App() {
  const location = useLocation();
  return (
    <div className="App">
      {
        (Auth.isAuthorized() && location.pathname !== '/login') ? <Navigation /> : ''
      }
      <Routes
        location={location}
        redirect="/login"
        routes={[...routes['app'], ...routes['comman']]}
        isAuthorized={Auth.isAuthorized()}
        // isAuthorized={true}
        notFound="/404"
      />


    </div>
  );
}

export default App;
