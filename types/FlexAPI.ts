interface FlexAPIResponse {
	channel: "LTC" | "STABLE" | "DEV",
	desc: string,
	file: string,
	filesize: number,
	hwidmatch: string,
	manufacturer: string,
	md5: string,
	model: string,
	name: string,
	photourl: string,
	sha1: string,
	sku: string,
	url: string,
	version: string,
	zipfilesize: number,
	chrome_version: string,
	hwids: string[]
}

export default FlexAPIResponse