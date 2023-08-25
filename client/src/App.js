import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SignMessage from './Components/SignMessage';
import VerifyMessage from './Components/VerifyMessage';
import AircAdmin from './Components/AircAdmin'
import Temp from './Components/temp'
import LandingPage from './Components/Landing/LandingPage'
import SignInSignUpPage from './Components/SignInSignUp';
import AdminPage from './Components/page/adminpage';
import ClientPage from './Components/page/clientpage';
import UniversityPage from './Components/page/universitypage';

function App() {
  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <Router>
          <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}
            <Route path="/signin" element={<SignInSignUpPage />} />
            <Route path="/signMessage" element={<UniversityPage />} />
            <Route path="/verifyMessage" element={<ClientPage />} />
            <Route path="/admin" element={< AdminPage/>} />
            <Route path="/temp" element={<Temp />} />
          </Routes>
        </Router>
      </div>
      {/* <div className="w-full lg:w-1/2">
        <Router>
          <Routes>
            <Route path="/verifyMessage" element={<VerifyMessage />} />
          </Routes>
        </Router>
      </div>
      <div className="w-full lg:w-1/2">
        <Router>
          <Routes>
            <Route path="/admin" element={<AircAdmin />} />
          </Routes>
        </Router>
      </div>
      <div className="w-full lg:w-1/2">
        <Router>
          <Routes>
            <Route path="/temp" element={<Temp />} />
          </Routes>
        </Router>
      </div> */}
    </div>
  );
}

export default App;
