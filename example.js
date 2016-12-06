// # Usage

const Enum = require('easy-enum.js').default;

// Of course, you can simply use `import Enum from 'easy-enum.js'` with Babel.

// ## Create an Enum

let enums;
enums = new Enum(
    {name: 'RED', value: 'RED', text: 'Red'},
    {name: 'BLUE', value: 'BLUE', text: 'Blue'},
    {name: 'GREEN', value: 'GREEN', text: 'Green'}
);

// Also, you can put all enumerable items into an array:

enums = new Enum([
    {name: 'RED', value: 'RED', text: 'Red'},
    {name: 'BLUE', value: 'BLUE', text: 'Blue'},
    {name: 'GREEN', value: 'GREEN', text: 'Green'}
]);

/*
 Each enumerable item may have 3 properties, which are `name`, `value`, `text`.
 But, only `value` is required. And if you only care about the `value`, you could just setup with the code below:

 enums = new Enum('RED', 'BLUE', 'GREEN');

 Of course, `enums = new Enum(['RED', 'BLUE', 'GREEN'])` works too.
 This is as same as
 enums = new Enum(
     {name: 'RED', value: 'RED', text: 'RED'},
     {name: 'BLUE', value: 'BLUE', text: 'BLUE'},
     {name: 'GREEN', value: 'GREEN', text: 'GREEN'}
 );
 */

// It's quiet easy to use.
if (enums.RED === 'RED') {
    console.log(`enums.RED === 'RED' `, `returns ${enums.RED === 'RED'}`);
}

// Never worry about the Enum object could be modified.
console.log('-----0-----');
console.log(`Trying to touch Enum object`);
enums.RED = 'fake';
console.log(`enums.RED === 'RED' `, `returns ${enums.RED === 'RED'}`);

// ## APIs

console.log('-----1-----');
// Get enumerable item by name:
let item;
item = enums.get('RED');
// or: item = enums.getByName('RED');
console.log(`enums.get('RED') `, `returns ${JSON.stringify(item)}`);

// Get enumerable item by value:
item = enums.getByValue('RED');
console.log(`enums.getByValue('RED') `, `returns ${JSON.stringify(item)}`);

// Get name by value:
let name = enums.getNameByValue('RED');
console.log(`enums.getNameByValue('RED') `, `returns ${JSON.stringify(name)}`);

// Get text by value or name:
let text;
text = enums.getTextByValue('RED');
console.log(`enums.getTextByValue('RED') `, `returns ${text}`);
text = enums.getTextByName('RED');
console.log(`enums.getTextByName('RED') `, `returns ${text}`);

console.log('-----2-----');
// Get all names:
let names = enums.keys();
console.log(`enums.keys() `, `returns ${JSON.stringify(names)}`);

// Check if there is an item with a giving name:
console.log(`enums.hasKey('RED') `, `returns ${enums.hasKey('RED')}`);

// Check if there is an item with a giving value:
console.log(`enums.has('RED') `, `returns ${enums.has('RED')}`);
// there are two alias: `enums.include`, `enums.contain`.

// Count:
console.log(`There are ${enums.length}(enums.length) items.`);

console.log('-----3-----');
// Converts Enum to an array
let arr = enums.toArray();
console.log(`enums.toArray() `, `returns ${JSON.stringify(arr)}`);

// And, if needed, we can get an array contains particular items:
arr = enums.toArray('RED');
console.log(`enums.toArray('RED') `, `returns ${JSON.stringify(arr)}`);

console.log('End.');
// That all. Thank you for reading.
