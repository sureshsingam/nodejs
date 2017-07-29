const expect = require('expect');
const utils = require('./utils');


it('should add two numbers', ()=>{
    var res = utils.add(2,3);

    // if (res !== 5){
    //     throw new Error(`Expected 5 but got ${res}.`);
    // }

    // modifying the above if test with expect assertion
    expect(res).toBe(5).toBeA('number');

    

});


it('should async add 2 numbers', (done) => {

    utils.asyncAdd(3,4, (sum) => {
        expect(sum).toBe(7).toBeA('number');
        done();
    });
});




it('should square a number', ()=>{
    var res = utils.square(3);
    expect(res).toBe(9).toBeA('number');

});


it('should async square a number', (done) =>{
    utils.asyncSquare(4,(sum)=>{
        expect(sum).toBe(16).toBeA('number');
        done();
    })
});


//should verify first and last names are set


it('should set first and last names',()=>{
    var userObject = {
        Age: 33,
        location: 'Fredericton'
    }
    var fullName = "Suresh Jeyaverasingam";

    var res = utils.setName(userObject,fullName);
    expect(res).toBeA('object')
    // expect(res.firstName).toBe('Suresh')
    // expect(res.lastName).toBe('Jeyaverasingam')
    expect(res).toInclude({
        firstName: 'Suresh',
        lastName:'Jeyaverasingam'
    });
});


it('should expect some values',() =>{
    // you can have an assertion to check that two values are not equals
    // expect(12).toNotBe(13);
    // expect({name:'Andres'}).toEqual({name:'Andres'});
    
    // the following toEqual and toNotEqual is used for arrays and objects as each element in the object will be compared
    // if the normal toBe or ToNOtBe, its a ===, meaning not just the content but the type of the object must beidentical.

    // expect({name:'andres'}).toNotEqual({name:'Andres'});

    // check whether an array or object has items inluded
    // expect([2,3,4]).toInclude(4);

    // to expect an array / object has element in it
    expect([2,3,4]).toExclude(1);


    expect({
        name: 'Andrew',
        age:25,
        location: 'Philadelphia'
    })
    .toExclude(
        {age:23}
    )


});

