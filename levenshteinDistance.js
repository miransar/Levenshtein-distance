'use strict';

module.exports = function levenshtein (ccName, subscriberName) {
	if (!ccName || !subscriberName) return 0;

	const difference = [];

	let i;
	for (i = 0; i <= subscriberName.length; i++) {
		difference[i] = [i];
	}

	let j;
	for (j = 0; j <= ccName.length; j++) {
		difference[0][j] = j;
	}

	for (i = 1; i <= subscriberName.length; i++) {
		for (j = 1; j <= ccName.length; j++) {
			if (subscriberName.charAt(i - 1) === ccName.charAt(j - 1)) {
				difference[i][j] = difference[i - 1][j - 1];
			} else {
				difference[i][j] = Math.min(difference[i - 1][j - 1] + 1,
                                  Math.min(difference[i][j - 1] + 1,
                                    difference[i - 1][j] + 1));
			}
		}
	}

	const distance = difference[subscriberName.length][ccName.length];
	const max = Math.max(ccName.length, subscriberName.length);
	const value = (max - distance) / max;

	return value * 100;
};
