export const getUserType = () => {
    const userType = localStorage.getItem('userType');
    const expiration = localStorage.getItem('tokenExpiration');
  
    if (!userType || !expiration) {
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
  
    return userType;
  };
  
