import { MigrationInterface, QueryRunner } from "typeorm";

export class AtualizandoTipoDeCategoria1731370262545 implements MigrationInterface {
    name = 'AtualizandoTipoDeCategoria1731370262545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP COLUMN \`categories\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD \`categories\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`isProducer\` \`isProducer\` tinyint NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`isProducer\` \`isProducer\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP COLUMN \`categories\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD \`categories\` text NOT NULL`);
    }

}
