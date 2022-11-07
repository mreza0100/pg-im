import type { IPGConnectionConfigs } from "@src/types/connection.type";
import { Client } from "pg";

export default class Connection {
	constructor() {}

	public static async getConnection(config: IPGConnectionConfigs): Promise<Client> {
		const pgClient = new Client({
			user: config.user,
			password: config.password,
			database: config.database,
			host: config.address,
			port: config.port,
		});
		await pgClient.connect();

		return pgClient;
	}
}
