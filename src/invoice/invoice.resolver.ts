import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';
import {
  CreateInvoiceInput,
  CreateInvoiceOutput,
} from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { getErrorCode } from '../errors';
import { errorName } from '../errors/errorConstants';
import { InvoiceModel } from './model/invoice.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/user/authGuard';

@Resolver(() => InvoiceModel)
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Mutation(() => CreateInvoiceOutput)
  @UseGuards(new AuthGuard())
  async createInvoice(
    @Context('authInfo') authInfo,
    @Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput,
  ) {
    return await this.invoiceService.create(
      createInvoiceInput,
      authInfo.userId,
    );
  }

  @Query(() => [InvoiceModel])
  @UseGuards(new AuthGuard())
  async invoices(@Context('authInfo') authInfo) {
    return await this.invoiceService.findAll({ user: authInfo.userId });
  }

  @Query(() => InvoiceModel)
  @UseGuards(new AuthGuard())
  async invoice(@Context('authInfo') authInfo, @Args('id') id: string) {
    const invoice = await this.invoiceService.findOne({
      id,
      user: authInfo.userId,
    });
    if (!invoice) {
      const error = getErrorCode(errorName.NOT_FOUND);
      throw Error(error);
    } else {
      return invoice;
    }
  }

  @Mutation(() => InvoiceModel)
  @UseGuards(new AuthGuard())
  async updateInvoice(
    @Context('authInfo') authInfo,
    @Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput,
  ) {
    const isUpdated = await this.invoiceService.update(
      updateInvoiceInput,
      authInfo.userId,
    );
    if (!isUpdated) {
      const error = getErrorCode(errorName.NOT_FOUND);
      throw Error(error);
    }
    return true;
  }
}
