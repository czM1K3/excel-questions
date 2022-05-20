import readXlsxFile from "read-excel-file";

export const parseXlsx = async () => {
	const rawFetch = await fetch("/cetba.xlsx");
	const rawData = await rawFetch.blob();
	const excel = await readXlsxFile(new File([rawData], ""));
	return excel.filter((_row, index) => index > 0);
};
