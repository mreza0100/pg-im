import { Client } from "pg";

export interface IObserveService {
	observe(client: Client): Promise<void>;
}
