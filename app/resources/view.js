var inquirer = require("inquirer");
const appData = require(__dirname + "/appData.js");

var DAT;
appData.order();
appData.DATA;
DAT = appData.DATA;
console.log(DAT);


// function open(){
//     inquirer.prompt({
//         type : "input",
//         message:"-{",
//         name: "open"
//     })
//     .then( function(opn){
//         opn.input;
//         console.log(opn.input);
//         switch(opn.input){
//             case "order":
//                 order = appData.order()
//                 .then((parcel)=>{
//                     console.log(parcel);
//                 });
//             default:
//                 open();
//                 break;
//         }
//     });
// };

// setTimeout(open, 500);
