var charset = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','!','@','#','$','%','^','&', '*','~','?'];

module.exports = function () {
    var key = "";
    for(i=0; i < 35; i++){
        let r = Math.floor(Math.random()*charset.length);
        key += charset[r];    
    }
    return key;
}

