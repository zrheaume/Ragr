const moment = require("moment");
const ragrDB = require(__dirname + "/db_init.js");

var party = {
    validateParams: function (dat) {
        return new Promise(function (resolve, reject) {
            if (dat.info.party_name.length <= 3) {
                reject(["01", "Insufficient name length"]);
            } else if (dat.info.party_name.length > 3) {
                let partyDate = moment(dat.info.party_date, "YYYY-MM-DD");
                let now = moment();
                if (partyDate.isBefore(now, "day")) {
                    reject(["02", "Date has already passed"]);
                } else if (partyDate.isAfter(now, "day")) {
                    if (dat.info.party_address.length <= 8) {
                        reject(["03", "Address error"]);
                    } else if (dat.info.party_address.length > 8) {
                        for (var i in dat.profile) {
                            if (dat.profile[i] < 1) {
                                reject(["04", "Form item left empty"]);
                            }
                        }
                        resolve([dat, "Valid"]);
                    }
                }
            }
        })
    },
    create: function (dat) {
        return new Promise(function (resolve, reject) {
            party.validateParams(dat).then(function (res) {
                if (res[1] === "Valid") {
                    ragrDB.query("INSERT INTO profiles SET ?",
                        {
                            style: dat.profile.style,
                            bounds: dat.profile.bounds,
                            setting: dat.profile.setting,
                            alc: dat.profile.alc,
                            drug: dat.profile.drug
                        },
                        (err, res) => {
                            if (err){
                                resolve({succes: false, reason: err});
                            }
                            dat.info.profile_id = res.insertId;
                            // console.log(dat.info.profile_id);
                            ragrDB.query("SELECT user_id FROM users WHERE ?", { auth_key: dat.info.auth_key }, (err, res) => {
                                if (err) {
                                    resolve({ succes: false, reason: err });
                                }
                                else {
                                    dat.info.host_id = res[0].user_id;
                                    ragrDB.query("INSERT INTO parties SET ?",
                                        {
                                            party_name: dat.info.party_name,
                                            party_date: dat.info.party_date,
                                            party_address: dat.info.party_address,
                                            host_id: dat.info.host_id,
                                            profile_id: dat.info.profile_id
                                        },
                                        (err, res) => {
                                            if (err) {
                                                resolve({ succes: false, reason: err });
                                            }
                                            if (res) {
                                                resolve({ success: true, db: res });
                                            }
                                        });
                                }
                            })
                        }
                    )
                }
            });
        });
    }
};

module.exports = {
    create: party.create
};