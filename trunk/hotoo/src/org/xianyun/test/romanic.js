//JavaScript Program for converting Arabic numeral to Romanic numberal.
//Copyright (C)2001 Tim Chien
//URL: http://timc.idv.tw/
//All rights reserved.
function toroman(arabic) {
    var roman = "";
    arabic = parseInt(arabic);
    if ((isNaN(arabic))||(arabic>4999)||(arabic<0)) return "Error";
    arabic = ""+arabic+"";
    digit1 = arabic.substring(arabic.length,arabic.length-1);
    digit10 = (arabic.length-1 <= 0)? "non" : arabic.substring((arabic.length-1),(arabic.length-2));
    digit100 = (arabic.length-2 <= 0)? "non" : arabic.substring((arabic.length-2),(arabic.length-3));
    digit1000 = (arabic.length-3 <= 0)? "non" : arabic.substring((arabic.length-3),(arabic.length-4));
    
    if (digit1000 == 4)roman += "MMMM";
    if (digit1000 == 3)roman += "MMM";
    if (digit1000 == 2)roman += "MM";
    if (digit1000 == 1)roman += "M";
    if (digit100 == 9)roman += "CM";
    if (digit100 == 8)roman += "DCCC";
    if (digit100 == 7)roman += "DCC";
    if (digit100 == 6)roman += "DC";
    if (digit100 == 5)roman += "D";
    if (digit100 == 4)roman += "CD";
    if (digit100 == 3)roman += "CCC";
    if (digit100 == 2)roman += "CC";
    if (digit100 == 1)roman += "C";
    if (digit10 == 9)roman += "XC";
    if (digit10 == 8)roman += "LXXX";
    if (digit10 == 7)roman += "LXX";
    if (digit10 == 6)roman += "LX";
    if (digit10 == 5)roman += "L";
    if (digit10 == 4)roman += "XL";
    if (digit10 == 3)roman += "XXX";
    if (digit10 == 2)roman += "XX";
    if (digit10 == 1)roman += "X";
    if (digit1 == 9)roman += "IX";
    if (digit1 == 8)roman += "VIII";
    if (digit1 == 7)roman += "VII";
    if (digit1 == 6)roman += "VI";
    if (digit1 == 5)roman += "V";
    if (digit1 == 4)roman += "IV";
    if (digit1 == 3)roman += "III";
    if (digit1 == 2)roman += "II";
    if (digit1 == 1)roman += "I";
    return roman;
}
function toarabic(roman) {
    var arabic = 0;
    var err = false;
    for (i = 0;i < roman.length;i++) {
        var digit = roman.substring(i,i+1);
        if ((digit != "I") && (digit != "V") && (digit != "X") && (digit != "L") && (digit != "C") && (digit != "D") && (digit != "M")) {
            return "Error";
        }
    }
    for (i = 0;i < roman.length;i++) {
        var digit = roman.substring(i,i+1);
        var rdigit = roman.substring(i+1,i+2);
        var r2digit = roman.substring(i+2,i+3);
        var r3digit = roman.substring(i+3,i+4);
        if (digit == "I") {
	    ((rdigit == "V") || (rdigit == "X") || (r2digit == "V") || (r2digit == "X") || (r3digit == "V") || (r3digit == "X"))? arabic -= 1 : arabic += 1;
            if ((rdigit == "L") || (rdigit == "C") || (rdigit == "D") || (rdigit == "M") || (r3digit == "I")) err = true;
        } else if (digit == "V") {
            ((rdigit == "X") || (rdigit == "L") || (r2digit == "X") || (r2digit == "L") || (r3digit == "X") || (r3digit == "L"))? arabic -= 5 : arabic += 5;
            if ((rdigit == "C") || (rdigit == "D") || (rdigit == "M") || (r3digit == "V")) err = true;
        } else if (digit == "X") {
            ((rdigit == "L") || (rdigit == "C") || (r2digit == "L") || (r2digit == "C") || (r3digit == "L") || (r3digit == "C"))? arabic -= 10 : arabic += 10;
            if ((rdigit == "D") || (rdigit == "M") || (r3digit == "X")) err = true;
        } else if (digit == "L") {
            ((rdigit == "C") || (rdigit == "D") || (r2digit == "C") || (r2digit == "D") || (r3digit == "C") || (r3digit == "D"))? arabic -= 50 : arabic += 50;
            if ((rdigit == "M") || (r3digit == "L")) err = true;
        } else if (digit == "C") {
            ((rdigit == "D") || (rdigit == "M") || (r2digit == "D") || (r2digit == "M") || (r3digit == "D") || (r3digit == "M"))? arabic -= 100 : arabic += 100;
            if (r3digit == "C") err = true;
        } else if (digit == "D") {
            ((rdigit == "M") || (r2digit == "M") || (r3digit == "M"))? arabic -= 500 : arabic += 500;
            if (r3digit == "D") err = true;
        } else if (digit == "M") {
            arabic = arabic + 1000;
        }
    }
    if (err) return "Error";
    else return arabic;
}