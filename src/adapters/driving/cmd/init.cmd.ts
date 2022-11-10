import type { IInitialService } from "@src/types/domain/initial.port";
import Connection from "@utils/connection.util";
import yargs from "yargs";

interface params {
	configPath: string;
}

export class InitialCMD {
	private readonly commadSign = "pg-init [configPath]";
	private readonly commadHelp = [
		`initial settings on PostgreSQL database to store query logs.`,
		`please restart your database after executaion to apply changes.`,
		`usage: pg-im ./path/to/config/file`,
	];
	private readonly commadDoneMsg = `✅please restart your database to apply changes✅`;

	private readonly initialService: IInitialService;
	private readonly argv: yargs.Argv<{}>;

	constructor(argv: yargs.Argv<{}>, initialService: IInitialService) {
		this.initialService = initialService;

		this.argv = argv.command(
			this.commadSign,
			this.commadHelp.join("\n"),
			() => {},
			(args: yargs.ArgumentsCamelCase<params>) => this.handler(args),
		);
	}

	private async handler(args: yargs.ArgumentsCamelCase<params>) {
		const client = await Connection.getConnectionWithConfigFile(args.configPath);

		await this.initialService.initialPostgresSettings(client);

		await client.end();
		console.log(this.commadDoneMsg);
		this.argv.exit(0, new Error());
	}
}
