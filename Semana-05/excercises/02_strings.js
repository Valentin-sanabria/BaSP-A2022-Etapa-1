console.log('\n--Excercise 2: STRINGS.\n');
// Crear una variable de tipo string con al menos 10 caracteres y convertir todo el texto en mayúscula (utilizar toUpperCase).
console.log('\n-Excercise 2.a');
var longWord = 'im not shouting';
var imShouting =  longWord.toUpperCase();
console.log(imShouting);

// Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo string con los primeros 5 caracteres guardando el resultado en una nueva variable (utilizar substring).
console.log('\n-Excercise 2.b');
var fullString = 'small and large';
var halfString = fullString.substring(0, 5);
console.log('The  full string is: ' + fullString + ' and its first 5chars are: ' + halfString);

// Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo string con los últimos 3 caracteres 
// guardando el resultado en una nueva variable (utilizar substring).
console.log('\n-Excercise 2.c');
var fullString = 'small and large';
var halfString = fullString.substring( fullString.length - 3 );
console.log('The  full string is: ' + fullString + ' and the last 3chars are: ' + halfString);

// Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo string con la primera letra en
// mayúscula y las demás en minúscula. Guardar el resultado en una nueva variable.
console.log('\n-Excercise 2.d');
var fullString = 'im not shouting!';
var firstLetter = fullString.substring(0,1).toUpperCase();
var restOfWord = fullString.substring(1).toLowerCase();
var newFullString = firstLetter + restOfWord;
console.log(newFullString);

// Crear una variable de tipo string con al menos 10 caracteres y algún espacio en blanco. Encontrar la posición del
// primer espacio en blanco y guardarla en una variable (utilizar indexOf).
console.log('\n-Excercise 2.e');
var fullString = 'blank space.';
var blankPosition = fullString.indexOf(' ');
console.log('The first blank space is in the position n°: ' + blankPosition);

// Crear una variable de tipo string con al menos 2 palabras largas (10 caracteres y algún espacio entre medio).
// Utilizar los métodos de los ejercicios anteriores para generar un nuevo string que tenga la primera letra de ambas
// palabras en mayúscula y las demás letras en minúscula.
console.log('\n-Excercise 2.f');
var fullString = 'valentin sanabria';
var newString = fullString.substring(0,1).toUpperCase() + 
                fullString.substring(1, fullString.indexOf(' ')+ 1).toLowerCase() +
                fullString.substring(fullString.indexOf(' ') + 1, fullString.indexOf(' ') + 2).toUpperCase() +
                fullString.substring(fullString.indexOf(' ') + 2).toLowerCase();
console.log(newString);