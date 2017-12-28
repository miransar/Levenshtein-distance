'use strict';

module.exports = function levenshtein (input1, input2) {
	if (!input1 || !input2) return 0;

	const difference = [];

	let i;
	for (i = 0; i <= input2.length; i++) {
		difference[i] = [i];
	}

	let j;
	for (j = 0; j <= input1.length; j++) {
		difference[0][j] = j;
	}

	for (i = 1; i <= input2.length; i++) {
		for (j = 1; j <= input1.length; j++) {
			if (input2.charAt(i - 1) === input1.charAt(j - 1)) {
				difference[i][j] = difference[i - 1][j - 1];
			} else {
				difference[i][j] = Math.min(difference[i - 1][j - 1] + 1,
                                  Math.min(difference[i][j - 1] + 1,
                                    difference[i - 1][j] + 1));
			}
		}
	}

	const distance = difference[input2.length][input1.length];
	const max = Math.max(input1.length, input2.length);
	const value = (max - distance) / max;

	// value is converted to percentage

	return Math.round(value * 100);
};
