"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1724599249161 = void 0;
class InitialMigration1724599249161 {
    constructor() {
        this.name = 'InitialMigration1724599249161';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`orderID\` int NOT NULL, \`userID\` int NOT NULL, \`amount\` decimal NOT NULL, \`paymentMethod\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`transactionID\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ticketID\` int NOT NULL, \`userID\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`totalAmount\` decimal NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`ticket\` (\`id\` int NOT NULL AUTO_INCREMENT, \`eventName\` varchar(255) NOT NULL, \`categories\` text NOT NULL, \`place\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(2) NOT NULL, \`price\` decimal NOT NULL, \`availableQuantity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE \`ticket\``);
            yield queryRunner.query(`DROP TABLE \`orders\``);
            yield queryRunner.query(`DROP TABLE \`payment\``);
        });
    }
}
exports.InitialMigration1724599249161 = InitialMigration1724599249161;
