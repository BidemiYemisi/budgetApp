function retirement(age, name){
  let message = "Hi " + name + " your retirement age is";

  return function (jobStartDate){
    let retirementAge = jobStartDate - age;
    console.log(message + " " + retirementAge);
  }
}

retirement(98, "YEMISI")(2017);
//console.log(retire);

let retirement1 = (function(age, name){
  let message = "Hi " + name + " your retirement age is";
  return {
    retire: function(jobStartDate){
      let retirementAge = jobStartDate - age;
      console.log(message + " " + retirementAge);
    }
  }
})(100, "yemisi");

retirement1.retire(1000);

function game(){
  var score = Math.random() * 10;
  console.log(score > 1);
};
game();

function getName (message, fn){
  let sur = fn();
  console.log(message + " " + sur);
}

function getSurname(){
  let surname = "enete";
  return surname;
}

getName("Hello, I am ", getSurname);

// function constructors
let Person = function (name, job, age){
  this.name = name;
  this.job = job;
  this.age = age;
  this.calculateAge = function (){
    console.log(2018 - age);
  }
}
Person.prototype.printJob = function (){
  console.log(this.job);
}
Person.prototype.lastname = "enete";

let peter = new Person("peter", "network engineer", 31);
console.log(peter.printJob());
peter.gender = "male";
console.log(peter.lastname);


let Car = {
  model: "123model",
  getColour: function (){
    console.log("red");
  }
};


let benz = Object.create(Car);
benz.model = "newModel";
benz.name = "benz";
console.log(benz.getColour());

let toyota = Object.create(Car,{
  name: {value: "toyota corona"},
  model: {value: "ver 2"},
  price: {value: 1234}
});

console.log(toyota.lastname);


let a = 1;
let b = 2;
console.log("original " +a + " " + b)
//var list = [ 1, 2, 3 ]
//var [ a, , b ] = list
//[ b, a ] = [ a, b ]
b = [a, a=b][0];
console.log("swapped " +a + ", " + b)
