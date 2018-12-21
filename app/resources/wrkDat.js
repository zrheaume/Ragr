const ragrDB = require(__dirname + "/db_init.js");
dataset = {
    wrkDat : {}
}
init = function (dataset) {
    dataset.wrkDat.loadAll().then();
}
dataset.wrkDat = {
    loaded: false,
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
    loadAll: function () {
        return new Promise(function (resolve, reject) {
            dataset.profiles = {};

            ragrDB.query("SELECT * FROM profiles", function (err, res) {
                if (err) return reject("reason: " + err);
                for (var i in res) {
                    dataset.profiles[i] = new dataset.wrkDat.Profile(res[i]);
                };
                ragrDB.query("SELECT * FROM parties ORDER BY party_date", function (err, res) {
                    if (err) return reject("reason: " + err);
                    for (var i in res) {
                        let thisPartyName = res[i].party_name;
                        dataset.parties[thisPartyName] = new dataset.wrkDat.Party(res[i]);
                    };
                    ragrDB.query("SELECT * FROM users", function (err, res) {
                        if (err) return reject("reason: " + err);
                        for (var i in res) {
                            let thisUsername = res[i].username;
                            dataset.users[thisUsername] = new dataset.wrkDat.User(res[i]);
                        };
                        dataset.loaded = true;
                        return resolve(dataset, dataset.wrkDat.loaded);
                    });
                });
            });
        });
    }, 
};
init = function () {
    dataset.wrkDat.loadAll().then().catch(function(err){
        throw err
    });
}
logDataSet = function(){
    return console.log(dataset);
}

init()