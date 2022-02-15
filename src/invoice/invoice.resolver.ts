import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';
import {
  CreateInvoiceInput,
  CreateInvoiceOutput,
} from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { getErrorCode } from '../errors';
import { errorName } from '../errors/errorConstants';
import { InvoiceModel } from './model/invoice.model';

@Resolver(() => InvoiceModel)
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Mutation(() => CreateInvoiceOutput)
  async createInvoice(
    @Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput,
  ) {
    return await this.invoiceService.create(createInvoiceInput);
  }

  @Query(() => [InvoiceModel], { name: 'invoice' })
  async findAll() {
    return await this.invoiceService.findAll();
  }

  @Query(() => InvoiceModel, { name: 'invoice' })
  async findOne(@Args('id') id: string) {
    const invoice = await this.invoiceService.findOne({ id });
    if (!invoice) {
      const error = getErrorCode(errorName.NOT_FOUND);
      throw Error(error);
    } else {
      return invoice;
    }
  }

  @Mutation(() => InvoiceModel)
  async updateInvoice(
    @Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput,
  ) {
    const isUpdated = await this.invoiceService.update(updateInvoiceInput);
    if (!isUpdated) {
      const error = getErrorCode(errorName.NOT_FOUND);
      throw Error(error);
    }
    return true;
  }
}
