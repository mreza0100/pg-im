import { readFile } from "fs";

export default class File {
	public static async readOSFile(filePath: string): Promise<string> {
		return new Promise((resolve, reject) => {
			readFile(filePath, { encoding: "utf-8" }, (err, data) => {
				if (!err) resolve(data);
				else reject(err);
			});
		});
	}

	public static async readOSFileJson<T>(filePath: string): Promise<T> {
		const data = await this.readOSFile(filePath);
		return JSON.parse(data);
	}
}
