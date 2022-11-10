import { postgresSettingParams } from "@src/configs/pg";
import { historyTableName, schemaName } from "@src/configs/tables";
import { IInitialService } from "@src/types/domain/initial.port";
import { Client, QueryResult } from "pg";

export default class InitialService implements IInitialService {
	private async initSettings(client: Client) {
		const waits: Promise<QueryResult<any>>[] = [];

		for (const [key, val] of Object.entries(postgresSettingParams)) {
			waits.push(client.query(`ALTER SYSTEM SET ${key} TO ${val}`));
		}
		for (const wait of waits) await wait;
	}

	private async createSchema(client: Client) {
		const result = await client.query<{ exists: boolean }>(
			`SELECT EXISTS(SELECT 1 FROM information_schema.schemata WHERE schema_name = '${schemaName}')`,
		);

		if (result.rows.length === 0 || result.rows[0].exists) return;

		await client.query(`CREATE SCHEMA ${schemaName}`);
	}

	private async createHistoryTable(client: Client) {
		await client.query(
			`CREATE TABLE IF NOT EXISTS ${schemaName}.${historyTableName} (
				id SERIAL PRIMARY KEY,
				raw_query VARCHAR NOT NULL,

				table_name VARCHAR NOT NULL,
				conditional_colums VARCHAR[] NOT NULL,
				selected_fields VARCHAR[] NOT NULL,
				limitation INT DEFAULT NULL,
				skipped INT DEFAULT NULL,

				exec_at BIGINT NOT NULL,
				created_at BIGINT
			)`,
		);
	}

	public async initialPostgresSettings(client: Client) {
		await this.createSchema(client);
		await this.initSettings(client);
		await this.createHistoryTable(client);
	}
}
