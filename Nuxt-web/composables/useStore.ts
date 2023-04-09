export const useStore = (key: any) => {
  switch (key) {
    case 'userInfo':
      return useState('userInfo', () => useCookie('userInfo') || null);
    default:
      return null;
  }
}
