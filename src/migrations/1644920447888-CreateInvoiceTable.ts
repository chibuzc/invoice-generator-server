import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInvoiceTable1644920447888 implements MigrationInterface {
  name = 'CreateInvoiceTable1644920447888';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invoice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "customerName" character varying NOT NULL, "shippingAddress" character varying NOT NULL, "billingAddress" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "transactionDate" TIMESTAMP NOT NULL, "items" jsonb NOT NULL, "total" integer NOT NULL, "dueDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_9c7bded420738b9cf6d14b99c72" UNIQUE ("phoneNumber"), CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD CONSTRAINT "FK_f8e849201da83b87f78c7497dde" FOREIGN KEY ("userId") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice" DROP CONSTRAINT "FK_f8e849201da83b87f78c7497dde"`,
    );
    await queryRunner.query(`DROP TABLE "invoice"`);
  }
}
