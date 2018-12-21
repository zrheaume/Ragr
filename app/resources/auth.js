const ragrDB = require(__dirname + "/db_init.js");
const keygen = require(__dirname + "/keygen.js");

module.exports = {
    authLogin: function (pkt) {
        return new Promise(function (resolve, reject) {
            var authRes = {
                login : false
            }
            ragrDB.query("SELECT * FROM users WHERE ?", { username: pkt.usr }, (err, res) => {
                if (err) reject(err);
                else{
                    if(res[0].pw === pkt.pw){
                        authRes.login = true;
                        if(res[0].auth_key){
                            console.log("has key");
                            authRes.hasKey = true;
                            authRes.key = res[0].auth_key;
                            resolve(authRes);
                        } else{
                            console.log("does not have key")
                            authRes.hasKey = false;
                            let newAuthKey = keygen();
                            authRes.key = newAuthKey;
                            ragrDB.query("UPDATE users SET ? WHERE ?",
                            [{auth_key : newAuthKey},{user_id : res[0].user_id}],
                            (err, success)=>{
                                if (err) throw err;
                                if (success){
                                    authRes.insert = "success";
                                    resolve(authRes);
                                }
                            })
                        }
                    } else{
                        resolve(false);
                    }
                }
            });
        })
    }
};
