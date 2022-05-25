'use strict';

/*
 * Load the model data of the problem 2 of cs142's project4.
 * We load into the property cs142models.statesModel a function that returns  an array of
 * strings with the names of the states.
 *
 * See README.md for more details
 */

var cs142models;

if (cs142models === undefined) {
   cs142models = {};
}

cs142models.statesModel = function() {
   return [
      'Alabama', 
      'Alaska', 
      'Arizona', 
      'Arkansas', 
      'California',
      'Kansas', 
      'Kentucky', 
      'Louisiana', 
      'Maine', 
      'Maryland',
      'South Dakota', 
      'Tennessee', 
      'Texas', 
      'Utah', 
      'Vermont',
      'Montana', 
      'Nebraska', 
      'Nevada', 
      'New Hampshire', 
      'New Jersey',
      'Hawaii', 
      'Idaho', 
      'Illinois', 
      'Indiana', 
      'Iowa',
      'New Mexico', 
      'New York', 
      'North Carolina', 
      'North Dakota', 
      'Ohio',
      'Oklahoma', 
      'Oregon', 
      'Pennsylvania', 
      'Rhode Island', 
      'South Carolina',
      'Massachusetts', 
      'Michigan', 
      'Minnesota', 
      'Mississippi', 
      'Missouri',
      'Colorado', 
      'Connecticut', 
      'Delaware', 
      'Florida', 
      'Georgia',
      'Virginia', 
      'Washington', 
      'West Virginia', 
      'Wisconsin', 
      'Wyoming'
   ];
};

