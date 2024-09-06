import { DataSource } from "typeorm";
import { Payment } from "./models/Payment";
import { Order } from "./models/Order";
import { Ticket } from "./models/Ticket";
import { User } from "./models/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
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
