export interface ICSVParser {
	parseLogs(logs: string): ICSVLogObj[];
}
export interface ICSVLogObj {
	date: string;
	client: string;
	logResult: string;
	statement: string;
}
