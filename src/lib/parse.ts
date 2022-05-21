import readXlsxFile from "read-excel-file";

export const parseXlsx = async (file?: File) => {
	const readFile = file ?? await (async () => {
		const rawFetch = await fetch("/cetba.xlsx");
		const rawData = await rawFetch.blob();
		return new File([rawData], "");
	})();
	const excel = await readXlsxFile(readFile);
	return {
		data: excel.filter((_row, index) => index > 0),
		headers: excel[0],
	};
};
