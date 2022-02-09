const addCoffee = function (prevName, name) {
    setTimeout(function () {
        coffeeMaker.next(prevName ? prevName + ', ' + name : name);
    }, 500);
};

const coffeeGenerator = function* () {
    const espresso = yield addCoffee('', '에스프레소');
    console.log(espresso);

    const americano = yield addCoffee(espresso, '아메리카노');
    console.log(americano);

    const mocha = yield addCoffee(americano, '카페모카');
    console.log(mocha);

    const latte = yield addCoffee(mocha, '카페라떼');
    console.log(latte);
};

const coffeeMaker = coffeeGenerator();
coffeeMaker.next();