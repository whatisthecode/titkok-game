import { useState } from 'react';
import './index.css';
import { UserContext } from './contexts';
import Game from './modules/Game';
import { IUser } from './types/type';
// import GiftForm from './modules/GiftForm';
import NewRegisterForm from './modules/NewRegister';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  // const [step, setStep] = useState<Step>('register');

  // const renderComponentByStep = () => {
  //   switch (step) {
  //     case 'register':
  //       return <NewRegisterForm setStep={setStep} />;
  //     case 'game':
  //       return <Game setStep={setStep} />;
  //     case 'result':
  //       return <GiftForm setStep={setStep} />;
  //     default:
  //       return null;
  //   }
  // };
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/form" element={<NewRegisterForm />} /> {/* New route */}
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
