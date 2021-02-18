import React, { useEffect, useState } from 'react';
import { AppNavigator } from './navigation/AppNavigator';
import { UserContext } from './contexts/userContexts';
import { ReviewsContext } from './contexts/reviewsContext';
import { User } from './types/User';
import { Review } from './types/Review';

const App: React.FC<{}> = () => {
  const [user, setUser] = useState<User>();
  const [reviews, setReviews] = useState<Review[]>([]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ReviewsContext.Provider value={{ reviews, setReviews }}>
        <AppNavigator />
      </ReviewsContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
