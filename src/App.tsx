import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import { UserContext } from './contexts';
import RegisterForm from './modules/Register';
import Game from './modules/Game';
import { IUser, Step } from './types/type';
// import GiftForm from './modules/GiftForm';

const App = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  // const [step, setStep] = useState<Step>('register');

  // const renderComponentByStep = () => {
  //   switch (step) {
  //     case 'register':
  //       return <Route path="/register" element={<RegisterForm setStep={setStep} />}/>;
  //     case 'game':
  //       return <Route path="/game" element={<Game setStep={setStep} />}/>;
  //     // case 'result':
  //     //   return <GiftForm setStep={setStep} />;
  //     default:
  //       return null;
  //   }
  // };
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/register" element={<RegisterForm />}/>
          <Route path="/game" element={<Game />}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
