import fs from "fs";
import fsPromises from "fs";
import config from "./config.js";
import { join, extname } from "path";

const {
	dir: { publicDirectory },
} = config;

export class Service {
	createFileStream(filename) {
		return fs.createReadStream(filename);
	}

	async getFileInfo(file) {
		const fullFilePath = join(publicDirectory, file);
		// valida se existe, se não existe estoura erro!!!
		await fsPromises.access(fullFilePath);

		const fileType = extname(fullFilePath);

		return {
			type: fileType,
			name: fullFilePath,
		};
	}

	async getFileStream(file) {
		const { name, type } = await this.getFileInfo(file);

		return {
			stream: this.createFileStream(name),
			type,
		};
	}
}
