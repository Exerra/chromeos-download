export const numToLocaleString = (num: any) => {
	return new Intl.NumberFormat().format(num)
}
