export const getToken = () => {
    const token = localStorage.getItem('auth');
    const expiration = localStorage.getItem('tokenExpiration');
  
    if (!token || !expiration) {
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
  
    return token;
  };
  
