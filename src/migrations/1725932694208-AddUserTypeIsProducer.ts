import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserTypeIsProducer1725932694208 implements MigrationInterface {
    name = 'AddUserTypeIsProducer1725932694208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`isProducer\` tinyint NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`isProducer\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_050a24c3e8a30e5d5e5999e5f6\` ON \`users\` (\`shopCartId\`)`);
    }

}
