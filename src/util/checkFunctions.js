export const xssCheck = (str, level) => {
    // xxs공격 방지를 위한 스크립트 변환
    if (level == undefined || level == 0) {
      str = str.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g,"");
    } else if (level != undefined && level == 1) {
      str = str.replace(/\</g, "&lt;");
      str = str.replace(/\>/g, "&gt;");
    }
    return str;
  }