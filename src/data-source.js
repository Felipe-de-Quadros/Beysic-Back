"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Payment_1 = require("./models/Payment");
const Order_1 = require("./models/Order");
const Ticket_1 = require("./models/Ticket");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "tales",
    password: "Masterkey",
    database: "beysic",
    entities: [Ticket_1.Ticket, Order_1.Order, Payment_1.Payment],
    migrations: ["src/migrations/*.ts"],
    synchronize: false,
    logging: true
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
