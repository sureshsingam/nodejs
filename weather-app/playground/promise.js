var asyncAdd = (a,b) => {
    return new Promise((resolve,reject) => {
        setTimeout( () => {
            if (typeof a === 'number' && typeof b === 'number'){
                resolve(a+b);
            }
            else{
                reject('Either a or b is not a number')
            }
        },1500)
    });
}

// var somePromise = new Promise( (resolve,reject) => {
//     setTimeout( () => {
//         resolve('Hey. It worked!')
//         // reject('Unable to fulfill promise')
//     },2500);
    
// });

asyncAdd(5,'6').then( (message) => {
    console.log('Success: ', message);
    return asyncAdd(message, 33)
}).then( (res) => {
    console.log('11+33 : ', res);
}).catch( (errorMessage) => {
    console.log(errorMessage);
});

