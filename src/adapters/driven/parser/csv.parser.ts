import papa from "papaparse";
import Pattern from "@src/utils/pattern.tuil";
import { ICSVParser, ICSVLogObj } from "@src/types/adapters/driven.parser.csv";

export class CSVParser implements ICSVParser {
	private junk = "statement: ";
	private targetStartWith = `${this.junk}SELECT`;

	constructor() {}

	private parseCSVLog(queryCSVLog: string[]): ICSVLogObj {
		return {
			date: queryCSVLog[0],
			logResult: queryCSVLog[11],
			statement: queryCSVLog[13],
			client: queryCSVLog[22],
		};
	}

	private isTheRightLog(log: ICSVLogObj): boolean {
		if (log.client === "im-pg" || log.client === "psql") {
			return false;
		}
		if (log.logResult !== "LOG") {
			return false;
		}
		if (!log.statement.startsWith(this.targetStartWith)) {
			return false;
		}

		return true;
	}

	private trimQuery(log: ICSVLogObj): ICSVLogObj {
		log.statement = log.statement.replace(this.junk, "");
		log.statement = Pattern.spaceTrim(log.statement);

		return log;
	}

	public parseLogs(logs: string): ICSVLogObj[] {
		const { data } = papa.parse<string[]>(logs);

		const stmtsObjs: ICSVLogObj[] = [];
		for (const csvLog of data) {
			const logObj = this.parseCSVLog(csvLog);
			if (!this.isTheRightLog(logObj)) continue;

			const logResult = this.trimQuery(logObj);
			stmtsObjs.push(logResult);
		}

		return stmtsObjs;
	}
}
