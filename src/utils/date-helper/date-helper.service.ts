import * as moment from 'moment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DateHelperService {
  convertToDateTime(params: DateHelperInputParams): DateHelperOutput {
    const result: DateHelperOutput = {};

    for (const property in params) {
      console.log(property);
      console.log(params[property]);
      const date = moment(params[property], 'YYYY-MM-DD HH:mm:ss').toDate();
      console.log(date);
      result[property] = date;
    }
    return result;
  }
}
