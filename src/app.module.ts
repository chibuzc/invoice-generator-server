import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { InvoiceModule } from './invoice/invoice.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './errors/exceptionsFilter';
import { GraphQLError } from 'graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    InvoiceModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ headers: req.headers }),
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError = {
          message:
            (error.extensions.exception as any).response?.error ||
            error?.message,
          code:
            (error.extensions.exception as any).status ||
            error.extensions?.exception?.code ||
            error.originalError,
          name: (error.extensions.exception as any).name || error.name,
        };

        return graphQLFormattedError;
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
