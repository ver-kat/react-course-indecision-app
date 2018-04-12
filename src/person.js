console.log("person.js is running");
// class Person {
//     constructor(age) {
//         this.age = age;
//     }
//     isAdult = () => age > 18;
//     canDrink = () => age > 21;
// }

// export class Person { isAdult; canDrink };


const isAdult = (age) => age > 18;
const canDrink = (age) => age > 21;
const isSenior = (age) => age > 65;

export { isAdult, canDrink, isSenior as default };