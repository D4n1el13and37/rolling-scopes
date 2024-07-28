export const convertToCSV = (arrObject: string | object | []) => {
  const arr = typeof arrObject !== 'object' ? JSON.parse(arrObject) : arrObject;
  let str = '';

  for (let i = 0; i < arr.length; i++) {
    let line = '';
    for (const index in arr[i]) {
      if (line !== '') line += ',';

      line += arr[i][index];
    }
    str += line + '\r\n';
  }
  return str;
};
