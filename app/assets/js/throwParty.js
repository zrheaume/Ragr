redirectHome = function () {
    window.location.href = "/home"
}

$(document).ready(function () {
    $("select").formSelect();

    $("#submit-info").on("click", function () {
        let partyDataPkt = {
            info: {
                party_name: $("#party-name").val(),
                party_date: $("#party-date").val(),
                party_address: $("#party-location").val(),
                auth_key: sessionStorage.getItem("key"),
            },
            profile: {
                style: $("#party-style").val(),
                bounds: $("#party-bounds").val(),
                setting: $("#party-setting").val(),
                alc: $("#party-alc").val(),
                drug: $("#party-drug").val()
            }
        };
        console.log(partyDataPkt)
        $.post("/party", partyDataPkt, (err, res) => {
            if (err) throw err;
            if (res || res.success) {
                redirectHome();
            }
        });
    });
});