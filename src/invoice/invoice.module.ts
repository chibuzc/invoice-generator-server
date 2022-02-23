import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceResolver } from './invoice.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceModel } from './model/invoice.model';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { UserModel } from 'src/user/model/user.model';
import { DateHelperModule } from 'src/utils/date-helper/date-helper.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceModel]),
    UserModule,
    DateHelperModule,
  ],
  providers: [InvoiceResolver, InvoiceService],
})
export class InvoiceModule {}
