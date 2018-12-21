//! INCOMPLETE

$(document).ready(function(){
    $("select").formSelect();

    //TODO: INPUT VALIDATION
    $("#submit-info").on("click", function(){
        console.log($("#usr-style").val())
        let dataPkt = {
            style : $("#usr-style").val(),
            bounds : $("#usr-bounds").val(),
            setting : $("#usr-setting").val(),
            alc : $("#usr-alc").val(),
            drug : $("#usr-drug").val(),
        }
        $.post("/signup/1", dataPkt, (err, res)=>{
            if (err){
                console.log(err);
            } else if (res) {
                console.log(res);
                
            }
        });
        window.location.href = "/login"
    })
});