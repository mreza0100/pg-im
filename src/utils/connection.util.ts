import type { IPGConnectionConfigs } from "@src/types/connection.type";
import { Client } from "pg";
import File from "./file.utils";

export default class Connection {
	public static async getConnectionWithConfigFile(path: string): Promise<Client> {
		const pgConfigs = await File.readOSFileJson<IPGConnectionConfigs>(path);

		const pgClient = new Client({
			user: pgConfigs.user,
			password: pgConfigs.password,
			database: pgConfigs.database,
			host: pgConfigs.address,
			port: pgConfigs.port,
			application_name: "pg-im",
		});
		await pgClient.connect();

		return pgClient;
	}

	public static async getConnection(pgConfig: IPGConnectionConfigs): Promise<Client> {
		const pgClient = new Client({
			user: pgConfig.user,
			password: pgConfig.password,
			database: pgConfig.database,
			host: pgConfig.address,
			port: pgConfig.port,
		});
		await pgClient.connect();

		return pgClient;
	}
}
