//
//  Adds post title and  in Publii db from report data in report.db
//
//  title: classification Number (changed later)
//  slug:  classification Number
//  text: Report post
//  remainning fields are cloned from post record with slug == "reference"
//
//  post_additional_data records are created from the reference post.
//
//  Optional: can create individual markdown files
//

"use strict";

var fs = require('fs');
