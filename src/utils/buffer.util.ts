class StringBuffer {
	private buffer: string = "";
	private isBufOpen: boolean = false;

	public isOpen(): boolean {
		return this.isBufOpen;
	}

	public add(...newBufs: string[]) {
		this.isBufOpen = true;
		for (const buf of newBufs) {
			this.buffer += buf;
		}
	}

	public close(): string {
		this.isBufOpen = false;
		const buf = this.buffer;
		this.buffer = "";
		return buf;
	}
}
