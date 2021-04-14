
const number: RegExp = /^\d*$/;
const textNumber: RegExp = /^[a-zA-Z0-9\s]*$/;
const serverUrl: string = process.env.REACT_APP_NUTRITION_SERVER!



export { 
  number,
  textNumber,
  serverUrl
};