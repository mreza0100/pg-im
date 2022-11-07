import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

import { InitialCMD } from "@src/adapters/driving/cmd";
import InitialService from "./domain/init";

const argv = yargs(hideBin(process.argv));

const initialService = new InitialService();
new InitialCMD(argv, initialService);

argv.parse();
