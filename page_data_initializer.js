const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/steeringCommitteeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function () {
    console.log("db connection successful for pages");
});

const infoPageSchema = {
    page: String,
    title: String,
    body: [{
        paragraph: String
    }],
    sub_title: String,
    sub_body: [{
        paragraph: String
    }],
    home_description: String
}

const pageInfo = mongoose.model('Page', infoPageSchema);

const aboutData = {
    page: "about",
    title : "About AKOG",
    body: [{
        paragraph: "All Kinds of Girls (AKOG) was founded at Clark University in 1998 as a " +
            "single-day program for young girls. As AKOG enters our 19th year of service, " +
            "we now provide 19 weeks of Saturday mentorship programming to girls age 9-16 " +
            "during Clark University's academic year."
    }],
    sub_title: "AKOG strives to:",
    sub_body: [
        {
            paragraph: "Help girls recognize their own strength by providing them with a safe space to " +
                "express and maintain their true voice"
        },
        {
            paragraph: "Build bridges between girls from Worcester and women from the Clark University " +
                "community and beyond"
        },
        {
            paragraph: "Foster understanding by bringing together girls and women from diverse class, " +
                "ethnic and racial backgrounds"
        },
        {
            paragraph: "Promote self-confidence, high self-esteem, and healthy connections between girls " +
                "through creative activities, group discussions and guest speakers"
        }
    ],
    home_description: "AKOG is a non-profit youth-mentoring program run by Clark University undergraduate " +
        "female-aligned people and generously funded by Clark University."
}

const programData = {
    page: "program",
    title : "Our Program",
    body: [
        {
            paragraph: "AKOG offers two programs for girls age 9-15 during Clark University's academic year. " +
                "Our Fall semester takes place between October-December and our Spring semester takes " +
                "place between January- April. AKOG programs occur on Saturdays from 11am-2pm in Atwood " +
                "Hall at Clark University. "
        },
        {
            paragraph: "Our Younger Girls program serves 9-12 year olds. It is our largest program, with " +
                "approximately 100 participants registered annually. The Girls program includes Theme Days " +
                "intended to foster positive social connections and self-confidence."
        },
        {
            paragraph: "Our Older Girls program serves 13-16 year olds. It provides a mature focus for our older " +
                "participants. The Junior Mentor program includes Theme Days and is specifically designed " +
                "to help participants develop strong leadership skills."
        }
    ],
    sub_title: "General Format and Activities of AKOG",
    sub_body: [
        {
            paragraph: "AKOG runs every Saturday of the academic year from 10 AM to 2 PM."
        },
        {
            paragraph: "AKOG offers free home made lunch to all participants."
        },
        {
            paragraph: "Due to COVID 19, all programs are virtual."
        },
        {
            paragraph: "Each Saturday at AKOG has a different theme. The theme of the day is explored through " +
                "interactive, educational, and fun activities. Participants are divided into groups based " +
                "on age and Mentors lead their group through the day's activities. Past themes include: " +
                "Culture Day, Friendship Day, HERstory Day, and Science Day."
        }
    ],
    home_description: "AKOG takes place at Atwood Hall and offers two programs. The younger girl program serves " +
        "ages 9-12, while the older girl program serves ages 13-16. Our programs run Saturdays 11am - 2pm. Additionally, " +
        "AKOG provides free nutritious lunch for all girls. AKOG registration is always open! There is no deadline; we " +
        "always accept new applications."
}

const pageList = [];

pageList.push(aboutData);
pageList.push(programData);

pageInfo.insertMany(pageList, {}, function (err){
    if (err){
        console.log(err);
    }else{
        console.log("all data saved");
        mongoose.connection.close();
    }
})