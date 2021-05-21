const mongoose = require('mongoose');
const parse = require('csv-parse/lib/sync');

const fs = require('fs');
const rawdata = fs.readFileSync(__dirname + "/steeringcommitteedata.csv");

const csvList = parse(rawdata, {
    columns: true,
    skip_empty_lines: true
});

mongoose.connect('mongodb://localhost:27017/steeringCommitteeDB',
    {useNewUrlParser:true}, function (){
        console.log("db connection successful");
    });

const memberSchema = {
    title: String,
    name: String,
    year: String,
    major: String,
    bio: String,
    url: String
}

const Member = mongoose.model('Member', memberSchema);

const memberList = [];

csvList.forEach(function (member){
    memberList.push({
        "title": member["title"],
        "name": member["name"],
        "year": member["year"],
        "major": member["major"],
        "bio": member["bio"],
        "url": member["url"]
    });
});

Member.insertMany(memberList, {}, function(err){
    if(err){
        console.log(err);
    } else {
        console.log("All data saved successfully!");
        mongoose.connection.close();
    }
});