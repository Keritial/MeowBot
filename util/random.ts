export function generateRandomNumber(range: number, to: number): number {
	return Math.floor(Math.random() * (to - range) + range);
}
