var square = (x) => {
    var result = x*x;
    return result;
};

console.log(square(9))

var user = {
    name: 'Suresh',
    sayHi: () => {
        console.log(`Hi ${this.name}`);
    },
    sayHiAlt(){
        console.log(arguments)
        console.log(`Hi ${this.name}`);
    }
}
user.sayHiAlt(1,2,3);

function squareFunc (x){
    return Math.pow(x,2);
}

console.log(squareFunc(9));