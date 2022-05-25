"use strict";

function cs142MakeMultiFilter(originalArray) {
    // Make COPY of given original array, to avoid mutabile side effects
    let arr = [...originalArray];

    // Define function arrayFilterer to return 
    let f = function arrayFilterer(filterCriteria, callback) {
        let currentArray = arr;

        // Filter currentArray with given filterCriteria
        if (typeof(filterCriteria) !== 'function') {
            return currentArray;
        } else {
            // Replace currArray by array of filtered elements
            for (let i = 0; i < currentArray.length; i++) {
                // Store elements of currentArray satisfying filter criteria
                if (!filterCriteria(currentArray[i])) {
                    currentArray.splice(i, 1);
                    i--;
                }
            }
        }

        // Call callback function
        if (typeof(callback) === 'function') {
            callback.call(originalArray, currentArray);
        }

        // Returns itself
        return arrayFilterer;
    };

    return f;
}
