export interface IHistoryTable {
	id?: number;
	raw_query: string;

	table_name: string;
	conditional_colums: string[];
	selected_fields: string[];
	limitation: number;
	skipped: number;

	exec_at: number;
	created_at: number;
}
