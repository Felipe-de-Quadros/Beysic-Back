import { MigrationInterface, QueryRunner } from "typeorm";

export class TooMuchThingToList1725930855819 implements MigrationInterface {
    name = 'TooMuchThingToList1725930855819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("ticket");
        const foreignKey = table?.foreignKeys.find(fk => fk.name === "FK_ticket_user");

        if (foreignKey) {
            await queryRunner.dropForeignKey("ticket", foreignKey);
        }

        await queryRunner.query(`CREATE TABLE \`shopcart_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL DEFAULT '1', \`shopCartId\` int NULL, \`ticketId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shopcart\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`shopCartId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_050a24c3e8a30e5d5e5999e5f6\` (\`shopCartId\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`status\` enum ('PENDING', 'PAID', 'CANCELLED') NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_050a24c3e8a30e5d5e5999e5f6\` ON \`users\` (\`shopCartId\`)`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_0e01a7c92f008418bad6bad5919\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shopcart_item\` ADD CONSTRAINT \`FK_6f8787ec688f6fa7a6f1dccbb7e\` FOREIGN KEY (\`shopCartId\`) REFERENCES \`shopcart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shopcart_item\` ADD CONSTRAINT \`FK_f3157b9e6c8bbe148813c0d7673\` FOREIGN KEY (\`ticketId\`) REFERENCES \`ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shopcart\` ADD CONSTRAINT \`FK_c959abe9f5fdc48f5af5aa39b98\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_050a24c3e8a30e5d5e5999e5f66\` FOREIGN KEY (\`shopCartId\`) REFERENCES \`shopcart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_050a24c3e8a30e5d5e5999e5f66\``);
        await queryRunner.query(`ALTER TABLE \`shopcart\` DROP FOREIGN KEY \`FK_c959abe9f5fdc48f5af5aa39b98\``);
        await queryRunner.query(`ALTER TABLE \`shopcart_item\` DROP FOREIGN KEY \`FK_f3157b9e6c8bbe148813c0d7673\``);
        await queryRunner.query(`ALTER TABLE \`shopcart_item\` DROP FOREIGN KEY \`FK_6f8787ec688f6fa7a6f1dccbb7e\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_0e01a7c92f008418bad6bad5919\``);
        await queryRunner.query(`DROP INDEX \`REL_050a24c3e8a30e5d5e5999e5f6\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_050a24c3e8a30e5d5e5999e5f6\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`shopCartId\``);
        await queryRunner.query(`DROP TABLE \`shopcart\``);
        await queryRunner.query(`DROP TABLE \`shopcart_item\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`UQ_97672ac88f789774dd47f7c8be3\` ON \`users\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_ticket_user\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
