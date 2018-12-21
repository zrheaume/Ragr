const ragrDB = require(__dirname + "/db_init.js");

var appData;

var box = {
    User: function (attr) {
        this.user_id = attr.user_id;
        this.username = attr.username;
        this.pw = attr.pw;
        this.name_first = attr.name_first;
        this.name_last = attr.name_last;
        this.birth_date = attr.birth_date;
        this.profile_id = attr.profile_id;
        this.auth_key = attr.auth_key;
        this.parties_hosting = [];
    },
    Party: function (attr) {
        this.party_id = attr.party_id;
        this.party_name = attr.party_name;
        this.party_date = attr.party_date;
        this.party_address = attr.party_address;
        this.host_id = attr.host_id;
        this.profile_id = attr.profile_id;
    },
    Profile: function (attr) {
        this.profile_id = attr.profile_id;
        this.style = attr.style;
        this.bounds = attr.bounds;
        this.setting = attr.setting;
        this.alc = attr.alc;
        this.drug = attr.drug;
    },
    Parcel: function (temp) {
        this.users = temp.users;
        this.parties = temp.parties;
        this.profiles = temp.profiles;
    }
}

var carrier = {
    fetch: {
        profiles: function () {
            return new Promise(function (resolve, reject) {
                ragrDB.query("SELECT * FROM profiles", function (err, res) {
                    if (err) reject(err);
                    if (res) resolve(res);
                });
            });
        },
        parties: function () {
            return new Promise(function (resolve, reject) {
                ragrDB.query("SELECT * FROM parties ORDER BY party_date", function (err, res) {
                    if (err) reject(err);
                    if (res) resolve(res);
                });
            });
        },
        users: function () {
            return new Promise(function (resolve, reject) {
                ragrDB.query("SELECT * FROM users", function (err, res) {
                    if (err) reject(err);
                    if (res) resolve(res);
                });
            });
        }
    },
    loadParcel: function (callback) {
        var loadStatus = {
            profiles_loaded: false,
            parties_loaded: false,
            users_loaded: false
        }

        carrier.fetch.profiles()
            .then(function (profiles_dat) {
                let tempParcel = {}
                tempParcel.profiles = {};
                for (var i in profiles_dat) {
                    tempParcel.profiles[i] = new box.Profile(profiles_dat[i]);
                }
                loadStatus.profiles_loaded = true;
                carrier.fetch.parties()
                    .then(function (parties_dat) {
                        tempParcel.parties = {};
                        for (var j in parties_dat) {
                            tempParcel.parties[j] = new box.Party(parties_dat[j]);
                        }
                        loadStatus.parties_loaded = true;
                        carrier.fetch.users()
                            .then(function (users_dat) {
                                tempParcel.users = {};
                                for (var k in users_dat) {
                                    tempParcel.users[k] = new box.User(users_dat[k]);
                                }
                                loadStatus.users_loaded = true;
                                callback(loadStatus, tempParcel);
                            }).catch(function (err) { if (err) return ([loadStatus, err]) });
                    }).catch(function (err) { if (err) return ([loadStatus, err]) });;
            }).catch(function (err) { if (err) return ([loadStatus, err]) });;
    }
};

carrier.loadParcel(function (status, parcel) {
    appData = parcel;
});

function order() {
    carrier.loadParcel(function (status, parcel) {
        appData = parcel;
    });
};

order();

module.exports = {
    order: order,
    DATA : appData
}


