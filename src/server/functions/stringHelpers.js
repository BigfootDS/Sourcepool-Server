const findNthOccurence = (string, nth, char) => {
	let index = 0
	for (let i = 0; i < nth; i += 1) {
	  if (index !== -1) index = string.indexOf(char, index + 1)
	}
	return index
}


module.exports = {
	findNthOccurence
}