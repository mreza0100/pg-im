import { IHistoryTable } from "../tables.type";
import { ICSVLogObj } from "./driven.parser.csv";

export interface IStatementParser {
	parseSelectStatements(queries: ICSVLogObj[]): Promise<IHistoryTable[]>;
}
