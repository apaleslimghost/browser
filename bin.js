#!/usr/bin/env node

var serve = require('./');
var argv  = require('minimist')(process.argv.slice(2));

serve(argv._[0], argv);
