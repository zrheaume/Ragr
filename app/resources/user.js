const moment = require("moment");
const ragrDB = require(__dirname + "/db_init.js");

var user = {
    temp: {},
    //validateSignup: Checks if new user is 21, checks username availability
    //TODO: Promise resolution/rejection
    validateSignup: function (dat) {
        return new Promise(function (resolve, reject) {
            if (user.checkIfTwentyOne(dat.birth_date)) {
                console.log("birthdate passed");
                ragrDB.query("SELECT * FROM users WHERE ?", { username: dat.username }, (err, res) => {
                    if (res.length === 0) {
                        console.log("username available");
                        user.temp.signup = dat;
                        // console.log(user.temp.signup);
                    } else {
                        console.log("username taken");
                    }
                });
            } else {
                console.log("too young");
            }
        });
    },
    account : {
        //account.create: Attempts to insert user's answer profile into ragrDB. On success, attempts to insert
        //user's account information into DB
        //TODO: Promise resolution/rejection
        create : function(dat){
            return new Promise (function (resolve, reject){
                ragrDB.query("INSERT INTO profiles SET ?", {style:dat.style, bounds: dat.bounds, setting: dat.setting, alc: dat.alc, drug: dat.drug}, (err, res)=>{
                    if (err) throw err;
                    user.temp.signup.profile_id = res.insertId
                    console.log(user.temp.signup);
                    ragrDB.query("INSERT INTO users SET ?", 
                    {
                        username: user.temp.signup.username, 
                        pw: user.temp.signup.pw, 
                        name_first: user.temp.signup.name_first,
                        name_last: user.temp.signup.name_last,
                        birth_date: user.temp.signup.birth_date,
                        profile_id: user.temp.signup.profile_id
                    },
                    (err,res)=>{
                        if(err) throw err;
                        console.log(res);
                    }) 
                });
            })
        }
    },
    checkIfTwentyOne(dateSubmitted) {
        let passDate = moment().subtract(21, "y");
        let caseDate = moment(dateSubmitted, "YYYY-MM-DD");

        if (moment(dateSubmitted).isBefore(passDate, "day")) {
            return true;
        } else if (moment(dateSubmitted).isAfter(passDate, "day")) {
            return false;
        }
    },
    getHome : function(key){
        return new Promise(function(resolve,reject){
            var pageData = {
                user_data : {},
                available_parties: []
            };
            console.log("Finding user");
            // let dataset = wrkDat.dataset();
            for (var i in dataset.users){
                if(dataset.users[i].auth_key === key){
                    console.log("User located. Building homepage dataset");
                    var thisUser = dataset.users[i];
                    pageData.user_data = {
                        username : thisUser.username,
                        name_first : thisUser.name_first
                    };
                    for (var a in dataset.profiles){
                        if(dataset.profiles[a].profile_id === thisUser.profile_id){
                            pageData.user_data.profile = {
                                style: dataset.profiles[a].style,
                                bounds: dataset.profiles[a].bounds,
                                setting: dataset.profiles[a].setting,
                                alc: dataset.profiles[a].alc,
                                drug: dataset.profiles[a].drug,
                            }
                        }
                    }
                }
            };
            for (var b in dataset.parties){
                let thisParty = dataset.parties[b];
                let tempdate = moment(thisParty.party_date).format("MM-DD-YYYY");
                thisParty.party_date = tempdate;
                for (var k in dataset.profiles){
                    if(dataset.profiles[k].profile_id === thisParty.profile_id){
                        thisParty.profile = {
                            style: dataset.profiles[k].style,
                            bounds: dataset.profiles[k].bounds,
                            setting: dataset.profiles[k].setting,
                            alc: dataset.profiles[k].alc,
                            drug: dataset.profiles[k].drug
                        };
                        thisParty.score = user.scoreMatch(pageData.user_data.profile, thisParty.profile);
                        pageData.available_parties.push(thisParty);
                    }
                };
                for (var p in dataset.users){
                    if(dataset.users[p].user_id === thisParty.host_id ){
                        thisParty.host = dataset.users[p].username;
                    }
                }
            }
            resolve(pageData);
        });
    },
    scoreMatch : function(usrProf, partyProf){
        var score = {};
        score.style = Math.abs(((usrProf.style / partyProf.style)*100));
        score.bounds = Math.abs(((usrProf.bounds / partyProf.bounds)*100));
        score.setting = Math.abs(((usrProf.setting / partyProf.setting)*100));
        score.alc = Math.abs(((usrProf.alc / partyProf.alc)*100));
        score.drug = Math.abs(((usrProf.drug / partyProf.drug)*100));

        score.ovr = Math.round((score.style + score.bounds + score.setting + score.alc + score.drug)/5);

        return score;
    }
}

module.exports = {
    validateSignup: user.validateSignup,
    account: {
        create : user.account.create
    },
    getHome : user.getHome 
}