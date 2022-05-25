"use strict";

/* jshint node: true */

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var schemaInfo = new Schema({
    version: String,
    load_date_time: {type: Date, default: Date.now},
});

// the schema is useless so far
// we need to create a model using it
var SchemaInfo = mongoose.model('SchemaInfo', schemaInfo);

// make this available 
module.exports = SchemaInfo;
