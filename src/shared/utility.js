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

	const parts = header.split(",");
	let links = {};

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
	let fetchedCharacters = results.map((i) => {
		const books = i.books.map((book) => book.match(/\d+/g).map(Number));
		const isGender = i.gender ? i.gender : "Unknown";
		const isCulture = i.culture ? i.culture : "Unknown";
		const aliases = i.aliases[0] ? i.aliases : [];
		const names = i.name[0] ? i.name : [];
		let aliasesChar = Array.prototype.concat(names, aliases);
		const namesAndAliases = aliasesChar.join(", ");
		return {
			nameAndAliases: namesAndAliases,
			gender: isGender,
			culture: isCulture,
			books: books,
			numberOfSeasons: i.tvSeries.length,
		};
	});
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
	const fetchedBooks = results.map((i) => {
		let released = formatDate(i.released);
		return {
			name: i.name,
			ISBN: i.isbn,
			nrPages: i.numberOfPages,
			releaseDate: released,
		};
	});

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
