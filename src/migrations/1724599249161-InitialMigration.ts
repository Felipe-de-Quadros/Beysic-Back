import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1724599249161 implements MigrationInterface {
    name = 'InitialMigration1724599249161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`orderID\` int NOT NULL, \`userID\` int NOT NULL, \`amount\` decimal NOT NULL, \`paymentMethod\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`transactionID\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ticketID\` int NOT NULL, \`userID\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`totalAmount\` decimal NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket\` (\`id\` int NOT NULL AUTO_INCREMENT, \`eventName\` varchar(255) NOT NULL, \`categories\` text NOT NULL, \`place\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(2) NOT NULL, \`price\` decimal NOT NULL, \`availableQuantity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`ticket\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP TABLE \`payment\``);
    }

}
