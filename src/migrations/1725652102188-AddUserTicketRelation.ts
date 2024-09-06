import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserTicketRelation1725652102189 implements MigrationInterface {
    name = 'AddUserTicketRelation1725652102189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_ticket_user\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_ticket_user\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP COLUMN \`userId\``);
    }
}
