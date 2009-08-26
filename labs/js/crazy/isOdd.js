
function isOdd (n) {
    return (n&1)!==0;
}
function isOdd2 (n) {
    return (n%2)!==0;
}
function crazyIt () {
    var fs=[isOdd, isOdd2];
    return [{funs:fs, args:[0], times:1000000},
           {funs:fs, args:[1], times:1000000},
           {funs:fs, args:[1000], times:1000000}];
}
