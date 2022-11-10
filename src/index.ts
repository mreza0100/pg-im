import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

import { InitialCMD, ObserveCMD } from "@src/adapters/driving/cmd";
import InitialService from "./domain/init.domain";
import ObserveService from "./domain/observe.domain";
import { CSVParser } from "./adapters/driven/parser/csv.parser";
import { StatementParser } from "./adapters/driven/parser/statement.parser";

const argv = yargs(hideBin(process.argv));

{
	const initialService = new InitialService();
	new InitialCMD(argv, initialService);
}

{
	const observeService = new ObserveService(new CSVParser(), new StatementParser());
	new ObserveCMD(argv, observeService);
}
argv.parse();
