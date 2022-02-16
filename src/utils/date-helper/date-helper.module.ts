import { Module } from '@nestjs/common';
import { DateHelperService } from './date-helper.service';

@Module({
  providers: [DateHelperService],
  exports: [DateHelperService],
})
export class DateHelperModule {}
