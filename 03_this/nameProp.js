var func = function (a, b, c, d) {
    console.log(this, a, b, c, d);
};
var bindfunc = func.bind({x: 1}, 4, 5);
console.log(func.name); // func
console.log(bindfunc.name); // bound func