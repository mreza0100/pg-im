import type { IPGConnectionConfigs } from "@src/types/connection.type";
import type { IInitialService } from "@src/types/domain/initial.port";
import Connection from "@utils/connection.util";
import File from "@utils/file.utils";
import yargs from "yargs";

interface params {
	configPath: string;
}

export class InitialCMD {
	private readonly commadSign = "pg-init [configPath]";
	private readonly commadHelp = `initial settings on PostgreSQL database to store query logs.\nplease restart your database to apply changes.`;

	private readonly initialService: IInitialService;
	private readonly argv: yargs.Argv<{}>;

	constructor(argv: yargs.Argv<{}>, initialService: IInitialService) {
		this.initialService = initialService;

		this.argv = argv.command(
			this.commadSign,
			this.commadHelp,
			() => {},
			(args: yargs.ArgumentsCamelCase<params>) => this.handler(args),
		);
	}

	private async handler(args: yargs.ArgumentsCamelCase<params>) {
		const configs = await File.readOSFileJson<IPGConnectionConfigs>(args.configPath);
		const client = await Connection.getConnection(configs);

		await this.initialService.initialPostgresSettings(client);

		await client.end();
		this.argv.exit(0, new Error());
	}
}
