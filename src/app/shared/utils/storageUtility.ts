export default class storageUtility {
    static setKey(key: string, value: any) {
      localStorage.setItem(key, value);
    }
  
    static getValue(key: string) {
      return localStorage.getItem(key);
    }
  
    static removeValue(key: string) {
      localStorage.removeItem(key);
    }
  }
  