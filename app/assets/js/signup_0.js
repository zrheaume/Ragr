$(document).ready(function(){
    $("#submit-info").on("click", function(){
        console.log("click");
        let dataPkt = {
            name_first : $("#name-first").val(),
            name_last : $("#name-last").val(),
            birth_date : $("#birth-date").val(),
            username : $("#username").val(),
            pw : $("#pw").val()
        }
        $.post("/signup/0", dataPkt, (err, res)=>{
            if (err){
                console.log(err);
            } else if (res) {
                console.log(res);
                console.log(window.location.href)
            }
        });
        window.location.href = "/signup/1";
    })
});