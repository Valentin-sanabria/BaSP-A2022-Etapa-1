console.log('\n--Excercise 6: FUNCTIONS.\n');
// Crear una función suma que reciba dos valores numéricos y retorne el resultado. Ejecutar la función y guardar el
// resultado en una variable, mostrando el valor de dicha variable en la consola del navegador.
console.log('\n-Excercise 6.a');
function add(x, y){
    return x + y;
}
result = add(2,3);
console.log(result);

// A la función suma anterior, agregarle una validación para controlar si alguno de los parámetros no es un número de
// no ser un número, mostrar una alerta aclarando que uno de los parámetros tiene error y retornar NaN como resultado.
console.log('\n-Excercise 6.b');
function addValidated(x, y){
    if (typeof x != 'number' || typeof y != 'number') {
        alert('One of your variables is NOT a number.');
        return NaN;
    }
    return x + y;
}
result = addValidated(3,'j');
console.log(result);

// Aparte, crear una función validate Integer que reciba un número como parámetro y devuelva verdadero
// si es un número entero.
console.log('\n-Excercise 6.c');
function validateInteger(x) {
    if ( Number.isInteger(x) ){
        return true;
    }
    else {
        return false;
    }
}
console.log(validateInteger(7));

// A la función suma del ejercicio 6b) agregarle una llamada a la función del ejercicio 6c. y que valide
// que los números sean enteros. En caso que haya decimales mostrar un alerta con el error y retornar el
// número convertido a entero (redondeado).
console.log('\n-Excercise 6.d');
function addAndValidate(x, y) {
    if (typeof x != 'number' || typeof y != 'number') {
        alert('One of your variables is NOT a number.');
        return NaN;
    }
    if( validateInteger(x) == false ) {
        alert(x + ' is NOT an integer. We rounded it to: '+ Math.round(x));
    }
    if( validateInteger(y) == false) {
        alert(y + ' is NOT an integer. We rounded it to: '+ Math.round(y));
    }
    return Math.round(x) + Math.round(y);
}
result = addAndValidate(2.8, 3.233);
console.log(result);

// Convertir la validación del ejercicio 6d) en una función separada y llamarla dentro de la función suma
// probando que todo siga funcionando igual
console.log('\n-Excercise 6.e');
function addRounded(x, y){
    result = x + y;
    result = validationInt(result);
    return result;
}
function validationInt(num) {
    if( validateInteger(num) == false ) {
        alert(num + ' is NOT an integer. We rounded it to: '+ Math.round(num));
        return Math.round(num);
    }
}
result = addRounded(2, 6.2);
console.log(result);