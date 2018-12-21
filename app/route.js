var express = require('express');
var context = require(__dirname + "/resources/context.js");
const auth = require(__dirname + "/resources/auth.js");
const user = require(__dirname + "/resources/user.js");
const party = require(__dirname + "/resources/party.js");

module.exports = function (app) {
    //* Handles request routing

    //! ======================
    //* Page Requests
    //!=======================

    // Render landing page using {filename}.handlebars
    // Using contextual data from context.js

    app.get("/", (req, res) => {
        // console.log("Request received");
        res.render("index", context.index);
    });

    app.get("/login", (req, res) => {
        // console.log("Request received");
        res.render("login", context.login);
    });
    
    app.get("/signup/:step", (req, res) => {
        // console.log("Request received");
        let step = req.params.step;
        let toSend = "signup" + step;
        res.render(toSend, context.signup[step]);
    });

    app.get("/home", (req, res) => {
        res.render("home", context.home);
    })

    app.get("/party/:actSel", (req,res)=>{
        let actSel = req.params.actSel;
        switch (actSel){
            case "throwParty":
                res.render("throwParty", context.party.throw);
                break;
        }
    })


    //! ======================
    //* Asset Requests
    //!=======================

    app.get("/assets/:type/:asset", (req, res) => {
        console.log(`Asset requested: ${req.params.asset}`);
        let type = req.params.type;
        let asset = req.params.asset;
        let filepath = __dirname + "/assets/" + type + "/" + asset + "." + type;
        res.sendFile(filepath);
    })

    //! ======================
    //* Service Requests
    //!=======================

    app.post("/build/:what", (req,res)=>{
        let what = req.params.what
        let forWho = req.body.for
        console.log(`Request received - build ${what} for ${forWho}`);
        switch(what){
            case "home":
                user.getHome(forWho).then(function(response){
                    res.send(response)
                });
                break;
        }

    })

    app.post("/auth", (req,res)=>{;
        let authReq = req.body;

        console.log(authReq);
        auth.authLogin(authReq)
        .then(function(authRes){
            res.json(authRes);
        });
    });

    app.post("/signup/:step", (req,res)=>{
        let dat = req.body;
        console.log(dat);
        switch(req.params.step){
            case "0":
                res.send(dat);
                user.validateSignup(dat);
                break;
            case "1":
                user.account.create(dat);
                res.send("Ok")
                break;
        }
    });

    app.post("/party",(req,res)=>{
        let dat = req.body;
        party.create(dat).then(function(response){
            console.log(response);
            if (response.success){
                res.send(response.success);
            }
        })
        
    });

};







