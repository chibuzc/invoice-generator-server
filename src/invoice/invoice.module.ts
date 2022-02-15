import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceResolver } from './invoice.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceModel } from './model/invoice.model';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceModel])],
  providers: [InvoiceResolver, InvoiceService]
})
export class InvoiceModule {}
