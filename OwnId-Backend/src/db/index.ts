import { DataSource } from "typeorm"
import {User} from "../entity/user.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "alekseyzelenskiy",
    password: "postgres",
    database: "ownid",
    synchronize: false,
    logging: false,
    entities: [User],
    migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
})


