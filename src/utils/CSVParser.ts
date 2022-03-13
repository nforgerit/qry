import { parse } from 'csv-parse/sync';

export default class CSVParser {

  static parse(input) {
    const parsed = parse(input, {
      columns: true,
      skip_empty_lines: true,
    })
          
    return parsed;
  }
}