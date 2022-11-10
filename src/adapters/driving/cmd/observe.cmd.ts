import type { IObserveService } from "@src/types/domain/observe.port";
import Connection from "@utils/connection.util";
import yargs from "yargs";

interface params {
	configPath: string;
}

export class ObserveCMD {
	private readonly commadSign = "observe [configPath]";
	private readonly commadHelp = [
		`observe🧐 commad will watch postgres for queries.`,
		`usage: pg-im ./path/to/config/file`,
	];

	private readonly observeService: IObserveService;
	private readonly argv: yargs.Argv<{}>;

	constructor(argv: yargs.Argv<{}>, observeService: IObserveService) {
		this.observeService = observeService;

		this.argv = argv.command(
			this.commadSign,
			this.commadHelp.join("\n"),
			() => {},
			(args: yargs.ArgumentsCamelCase<params>) => this.handler(args),
		);
	}

	private async handler(args: yargs.ArgumentsCamelCase<params>) {
		const client = await Connection.getConnectionWithConfigFile(args.configPath);

		await this.observeService.observe(client);
	}
}
