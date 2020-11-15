export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties,
	};
};

export function parseLinkHeader(header) {
	if (header.length === 0) {
		throw new Error("input must not be of zero length");
	}

	// Split parts by comma
	const parts = header.split(",");
	let links = {};
	// Parse each part
	for (let i = 0; i < parts.length; i++) {
		let section = parts[i].split(";");
		if (section.length !== 2) {
			throw new Error("section could not be split on ';'");
		}
		const url = section[0].replace(/<(.*)>/, "$1").trim();
		const name = section[1].replace(/rel="(.*)"/, "$1").trim();
		links[name] = url;
	}
	return links;
}

export function getCharactersData(results) {
	let fetchedCharacters = [];
	for (let i in results) {
		let books = [];
		for (let n = 0; n < results[i].books.length; n++) {
			books.push(results[i].books[n].match(/\d+/g).map(Number));
		}
		const isGender = results[i].gender ? results[i].gender : "Unknown";
		const isCulture = results[i].culture ? results[i].culture : "Unknown";

		let aliasesChar = [];

		if (results[i].name[0]) {
			aliasesChar.push(results[i].name);
		}
		if (results[i].aliases[0]) {
			aliasesChar.push(results[i].aliases);
		}

		const namesAndAliases = aliasesChar.join(", ");
		fetchedCharacters.push({
			nameAndAliases: namesAndAliases,
			gender: isGender,
			culture: isCulture,
			books: books,
			numberOfSeasons: results[i].tvSeries.length,
		});
	}

	return fetchedCharacters;
}

function formatDate(date) {
	const timeStr = date;
	const dateForm = new Date(timeStr);
	const day = dateForm.getDate();
	const year = dateForm.getFullYear();
	const month = dateForm.getMonth() + 1;
	const dateStr = day + "." + month + "." + year;
	return dateStr;
}

export function getBookData(results) {
	let fetchedBooks = [];
	for (let i in results) {
		const released = formatDate(results[i].released);
		fetchedBooks.push({
			name: results[i].name,
			ISBN: results[i].isbn,
			nrPages: results[i].numberOfPages,
			releaseDate: released,
		});
	}

	return fetchedBooks;
}

export function getPage(str) {
	if (str === undefined) {
		return 0;
	} else
		return Number(
			str.substring(str.lastIndexOf("page=") + 5, str.lastIndexOf("&"))
		);
}
