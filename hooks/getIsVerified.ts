export const getComplete = () => {
    const isComplete = localStorage.getItem('isComplete');
    const expiration = localStorage.getItem('tokenExpiration');
  
    if (!isComplete || !expiration) {
      return null;
    }
  
    const now = new Date().getTime();
    if (now > parseInt(expiration)) {
      // Token has expired, clear it from local storage
      localStorage.removeItem('auth');
      localStorage.removeItem('userType');
      localStorage.removeItem('tokenExpiration');
      return null;
    }
  
    return isComplete;
  };
  
