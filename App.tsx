import React, { useEffect, useState } from 'react';
import { AppNavigator } from './navigation/AppNavigator';
import { UserContext } from './contexts/userContexts';
import { User } from './types/User';

const App: React.FC<{}> = () => {
  const [user, setUser] = useState<User>();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppNavigator />
    </UserContext.Provider>
  );
};

export default App;
