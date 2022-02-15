import { Injectable } from '@nestjs/common';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceModel } from './model/invoice.model';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceModel)
    private invoiceRepository: Repository<InvoiceModel>,
  ) {}

  async create(createInvoiceInput: Partial<InvoiceModel>) {
    return await this.invoiceRepository.save(createInvoiceInput);
  }

  async findAll() {
    return await this.invoiceRepository.find();
  }

  async findOne(invoiceInput: Partial<InvoiceModel>) {
    const invoices = await this.invoiceRepository.find(invoiceInput);
    if (invoices.length) {
      return invoices[0]
    } else {
      return null
    }
  }

  async update(updateInvoiceInput: UpdateInvoiceInput) {
    const { id, ...invoiceInput } = updateInvoiceInput;
    const invoice = await this.invoiceRepository.findOne(id);
    if (!invoice) {
      return null;
    }
    invoice.total = invoiceInput.items.reduce((a, b) => a + b.amount, 0)

    await this.invoiceRepository.update(id, invoiceInput);
    return true;
  }
}
