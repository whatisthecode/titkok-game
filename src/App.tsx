import { useState } from 'react';
import './index.css';
import { UserContext } from './contexts';
import RegisterForm from './modules/Register';
import Game from './modules/Game';
import { IUser, Step } from './types/type';
import GiftForm from './modules/GiftForm';

const App = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [step, setStep] = useState<Step>('register');

  const renderComponentByStep = () => {
    switch (step) {
      case 'register':
        return <RegisterForm setStep={setStep} />;
      case 'game':
        return <Game setStep={setStep} />;
      case 'result':
        return <GiftForm setStep={setStep} />;
      default:
        return null;
    }
  };
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {renderComponentByStep()}
    </UserContext.Provider>
  );
};

export default App;
