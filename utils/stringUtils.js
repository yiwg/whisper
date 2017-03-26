function checkLength(target,max,min){
    return !target?0:target.length>max?-1:target.length<min?-2:1;
}

function checkPhone(target){
    var re=new RegExp(/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|                      \d{3}|\d{2}|\d{1}))$)$/);
    if(target.match(re)) return true;
    return false;
}
module.exports.checkLength=checkLength
module.exports.checkPhone=checkPhone