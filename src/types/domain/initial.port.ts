import { Client } from "pg";

export interface IInitialService {
	initialPostgresSettings(client: Client): Promise<void>;
}
