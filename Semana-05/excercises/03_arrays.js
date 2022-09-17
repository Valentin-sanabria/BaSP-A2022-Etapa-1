console.log('\n--Excercise 3: ARRAYS.\n');
// Dado el siguiente array mostrar por consola los meses 5 y 11 (utilizar console.log).
console.log('\n-Excercise 3.a');
var months =    ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

console.log('Fifth month: ' + months[4] +' and Eleventh mont: ' + months[10]);

// Ordenar el array de meses alfabéticamente y mostrarlo por consola (utilizar sort).
console.log('\n-Excercise 3.b');
months.sort();
console.log(months);
months =    ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

// Agregar un elemento al principio y al final del array (utilizar unshift y push).
console.log('\n-Excercise 3.c');
months.push('newMonth');
months.unshift('Yraurbef');
console.log(months);

// Quitar un elemento del principio y del final del array (utilizar shift y pop).
console.log('\n-Excercise 3.d');
months.shift();
months.pop();
console.log(months);

// Invertir el orden del array (utilizar reverse).
console.log('\n-Excercise 3.e');
months.reverse();
console.log(months);
months =    ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

// Unir todos los elementos del array en un único string donde cada mes este separado por un guión - (utilizar join).
console.log('\n-Excercise 3.f');
monthsTogether = months.join('-');
console.log(monthsTogether);

// Crear una copia del array de meses que contenga desde Mayo hasta Noviembre (utilizar slice).
console.log('\n-Excercise 3.g');
mayToNovember = months.slice(4,-1);
console.log(mayToNovember);