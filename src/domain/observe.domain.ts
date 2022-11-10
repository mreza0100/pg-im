import { IStatementParser } from "@src/types/adapters/driven.parser.statement";
import { ICSVParser } from "@src/types/adapters/driven.parser.csv";
import { IObserveService } from "../types/domain/observe.port";
import { Log } from "@src/configs/pg";
import { Client } from "pg";

export default class ObserveService implements IObserveService {
	private CSVParser: ICSVParser;
	private StatementParser: IStatementParser;

	constructor(CSVParser: ICSVParser, StatementParser: IStatementParser) {
		this.CSVParser = CSVParser;
		this.StatementParser = StatementParser;
	}

	private async copyLogs(client: Client) {
		const { rows } = await client.query<{ pg_read_file: string }>(
			`SELECT pg_read_file('${Log.fullPath}')`,
		);
		const { pg_read_file: logs } = rows[0];

		const selectQueries = this.CSVParser.parseLogs(logs);
		await this.StatementParser.parseSelectStatements(selectQueries);
	}

	private async clearLogs(client: Client) {
		console.log({
			clearLogs: await client.query(
				`COPY (select '') TO PROGRAM 'echo > "${Log.fullPath}"'`,
			),
		});
	}

	private async interval(client: Client) {
		await this.copyLogs(client);
		// await this.clearLogs(client);
	}

	public async observe(client: Client) {
		this.interval(client);
		// setInterval(() => this.interval(client), observeInterval);
	}
}
