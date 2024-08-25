import { DataSource } from "typeorm";
import { Payment } from "./models/Payment";
import { Order } from "./models/Order";
import { Ticket } from "./models/Ticket";
import { User } from "./models/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "tales",
  password: "Masterkey",
  database: "beysic",
  entities: [Ticket, Order, Payment, User],
  migrations: ["src/migrations/*.ts"],
  synchronize: false,
  logging: true
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
