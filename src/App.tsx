import { useState } from 'react';
import './index.css';
import { UserContext } from './contexts';
import RegisterForm from './modules/Register';
import Game from './modules/Game';
import { IUser } from './types/type';

const App = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <RegisterForm />
      <Game />
    </UserContext.Provider>
  );
};

export default App;
