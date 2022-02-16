import { Inject, Injectable } from '@nestjs/common';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceModel } from './model/invoice.model';
import { UserService } from 'src/user/user.service';
import { DateHelperService } from 'src/utils/date-helper/date-helper.service';
import { CreateInvoiceInput } from './dto/create-invoice.input';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceModel)
    private invoiceRepository: Repository<InvoiceModel>,
    @Inject(UserService)
    private userService: UserService,
    private readonly dateHelperService: DateHelperService,
  ) {}

  async create(createInvoiceInput: CreateInvoiceInput, userId: string) {
    const user = await this.userService.findOne({ id: userId });

    console.log(user);

    const formattedDates = this.dateHelperService.convertToDateTime({
      transactionDate: createInvoiceInput.transactionDate,
      dueDate: createInvoiceInput.dueDate,
    });

    const total = createInvoiceInput.items.reduce((a, b) => a + b.amount, 0);

    console.log(formattedDates);

    // apply discount, probably percentage

    return await this.invoiceRepository.save({
      ...createInvoiceInput,
      formattedDates,
      total,
      user,
    });
  }

  async findAll() {
    return await this.invoiceRepository.find();
  }

  async findOne(invoiceInput: Partial<InvoiceModel>) {
    const invoices = await this.invoiceRepository.find(invoiceInput);
    if (invoices.length) {
      return invoices[0];
    } else {
      return null;
    }
  }

  async update(updateInvoiceInput: UpdateInvoiceInput) {
    const { id, ...invoiceInput } = updateInvoiceInput;
    const invoice = await this.invoiceRepository.findOne(id);
    if (!invoice) {
      return null;
    }
    invoice.total = invoiceInput.items.reduce((a, b) => a + b.amount, 0);

    await this.invoiceRepository.update(id, invoiceInput);
    return true;
  }
}
