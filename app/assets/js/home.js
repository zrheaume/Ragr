$(document).ready(function(){
    
    let createParty = function (attr, dest){
        let row = $("<div class='row'>");
        let card = $("<div class='col s12 card blue-grey'>");
        let cardContent = $("<div class='card-content white-text'>");
        let partyName = $("<span class='card-title'>");
        let partyHost = $("<b>");
        let partyDate = $("<p>");
        let partyMatchScore = $("<p>");
        let cardAction = $("<div class='card-action'>");
        let actionOne = $("<a href='#'>");
        let actionTwo = $("<a href='#'>");

        partyName.text(attr.party_name);
        partyHost.text("Hosted by " + attr.host);
        partyDate.text("On " + attr.party_date);
        partyMatchScore.text("Your ragrMatch score " + attr.score.ovr);
        actionOne.text("Details");
        actionTwo.text("Request Invite");


        cardContent.append(partyName);
        cardContent.append(partyHost);
        cardContent.append(partyDate);
        cardContent.append(partyMatchScore);

        cardAction.append(actionOne);
        cardAction.append(actionTwo);

        card.append(cardContent);
        card.append(cardAction);

        row.append(card);

        dest.append(row);
    }
    
    auth = sessionStorage.getItem("key")
    $.post("/build/home",{for: auth}).then(function(res){
        // console.log(res)
        let partyListDest = $("#view-parties-section");
        for(var h in res.available_parties){
            createParty(res.available_parties[h], partyListDest);
        }

    });
    $("#throw").on("click", function(){
        window.location.href = "/party/throwParty"
    })

});