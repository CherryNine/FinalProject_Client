export const saveToSessionStorage = <T>(key: string, data: T): void => {
    sessionStorage.setItem(key, JSON.stringify(data));
  };
  
  export const getFromSessionStorage = <T>(key: string): T | null => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
  
  export const removeFromSessionStorage = (key: string): void => {
    sessionStorage.removeItem(key);
  };
  
  