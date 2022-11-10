import { IStatementParser } from "@src/types/adapters/driven.parser.statement";
import { IHistoryTable } from "@src/types/tables.type";
// import { parse } from "pgsql-parser";
import parser from "pg-query-parser";
import { ICSVLogObj } from "@src/types/adapters/driven.parser.csv";

export class StatementParser implements IStatementParser {
	constructor() {}

	private isStmtValid(stmt: any): boolean {
		if (stmt.length !== 1) {
			return false;
		}
		if (!stmt[0]?.SelectStmt) {
			return false;
		}

		return true;
	}

	private getTableFullName(stmt: any): string {
		const schemaName = stmt.SelectStmt.fromClause[0].RangeVar.schemaname;
		const tableName = stmt.SelectStmt.fromClause[0].RangeVar.relname;

		return `${schemaName}.${tableName}`;
	}

	// TODO: support for `SELECT "table"."column"`
	// TODO: support for `SELECT "schema"."table"."column"`
	// TODO: support for `SELECT *`
	// TODO: support for `SELECT "schema"."table"."*"`
	private getSelectedColumns(stmt: any): string[] {
		const columns: string[] = [];

		const { fields } = stmt.SelectStmt.targetList[0].ResTarget.val.ColumnRef;
		for (const field of fields) {
			columns.push(field.String.str);
		}

		return columns;
	}

	// TODO: change condition type from string to object to support type of condition and other data...
	// TODO: support for more than one condition
	private getConditions(stmt: any): string[] {
		const columns: string[] = [];

		const where = stmt.SelectStmt?.whereClause;
		if (!where) return columns;

		columns.push(where.A_Expr.lexpr.ColumnRef.fields[0].String.str);

		return columns;
	}

	private parseStatment(stmt: any): IHistoryTable {
		const result: Partial<IHistoryTable> = {};

		result.table_name = this.getTableFullName(stmt);
		result.selected_fields = this.getSelectedColumns(stmt);
		result.conditional_colums = this.getConditions(stmt);

		return result as IHistoryTable;
	}

	public async parseSelectStatements(queries: ICSVLogObj[]): Promise<IHistoryTable[]> {
		const results: IHistoryTable[] = [];

		for (const query of queries) {
			query.statement = `SELECT "id" FROM index_manager.history WHERE id = 2;`;
			console.log({ query });

			const stmtList = parser.parse(query.statement).query;

			if (!this.isStmtValid(stmtList)) {
				console.log(`statement ${query} is not valid, continue...`);
				continue;
			}
			const stmt = stmtList[0];

			const result = this.parseStatment(stmt);
			result.raw_query = query.statement;
			console.log(result);

			// result.exec_at = query.date;

			results.push(result as IHistoryTable);
		}

		return results;
	}
}
