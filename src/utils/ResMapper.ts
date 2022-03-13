
export default class ResMapper {
  static mapper(record) {
    let output = {};

    for (let key in record) {
      let k = String(key).trim();
      let v: any = String(record[key]).trim();

      if (k === 'Wörter') {
        v = parseInt(v);
      } else if (k === 'Datum') {
        v = new Date(v);
      }

      output[k] = v;
    }

    // add more
    return output;
  }
}