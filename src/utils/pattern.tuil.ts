export default class Pattern {
	private static space = " ";
	private static twoSpace = this.space.repeat(2);

	// makeAllSpacesToOne
	public static spaceTrim(str: string) {
		str = str.trim();
		while (str.includes(this.twoSpace)) {
			str = str.replaceAll(this.twoSpace, this.space);
		}
		return str;
	}

	public static getAllPatternLocations(str: string, phrase: string, caseSens: boolean) {
		const regExpValue = new RegExp(phrase, caseSens ? "g" : "gi");
		const arr = str.match(regExpValue) || [];

		let startIndex = 0;
		const matches: number[] = [];
		[].forEach.call(arr, element => {
			startIndex = str.indexOf(element, startIndex);
			matches.push(startIndex++);
		});

		return matches;
	}
}
