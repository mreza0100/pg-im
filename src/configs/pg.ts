export class Log {
	static dir = "pg_log";
	static fileName = "pg";
	static format = ".csv";
	static line_prefix = "%t [%p]: [%l-1] db=%d,user=%u ";
	static fullPath = `${Log.dir}/${Log.fileName}${Log.format}`;
}

export const postgresSettingParams = {
	log_directory: `"${Log.dir}"`,
	log_filename: `"${Log.fileName}"`,
	log_statement: `"all"`,
	logging_collector: `"on"`,
	log_rotation_age: `"0"`,
	log_truncate_on_rotation: `"off"`,
	log_connections: `"off"`,
	log_disconnections: `"off"`,
	log_error_verbosity: `"terse"`,
	log_line_prefix: `"${Log.line_prefix}"`,
	log_destination: `"csvlog"`,
};
