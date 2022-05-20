export const generateNumbers = (range: number, count: number) => {
	const numbers: number[] = [];
	for (let x = 0; x < count; x++) {
		const number = Math.floor(Math.random() * range);
		if (numbers.includes(number)) {
			x--;
		} else {
			numbers.push(number);
		}
	}
	return numbers;
};

export const generateNumberInRange = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
