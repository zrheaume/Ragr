$("#login-go").on("click", function(){
    let loginPkt = {};
    loginPkt.usr = $("#username").val();
    loginPkt.pw = $("#password").val();
    $.post("/auth",loginPkt,(res)=>{
        if (res){
            console.log(res);
            sessionStorage.setItem("key",res.key);
            window.location.href = "/home";
        }
    })
})