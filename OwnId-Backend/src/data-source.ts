import { DataSource } from "typeorm"
import {User} from "./entity/user.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "",
    password: "postgres",
    database: "ownid",
    synchronize: false,
    logging: false,
    entities: [User],
    migrations: [__dirname + "/migrations/*.ts"],
    subscribers: [],
})


