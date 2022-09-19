console.log('\n--Excercise 4: IF - ELSE.\n');
// Crear un número aleatorio entre 0 y 1 utilizando la función Math.random(), si el valor es mayor o igual que 0,5 
// mostrar una alerta con el mensaje “Greater than 0,5” y sino un alerta con el mensaje “Lower than 0,5”.
console.log('\n-Excercise 4.a');
randomNum = Math.random();
console.log(randomNum);
if ( randomNum < 0.5 ) {
    alert('Your number was ' + randomNum.toFixed(1) + ', its lower than 0.5');
}
else if (randomNum >= 0.5){
    alert('Your number was ' + randomNum.toFixed(1) + ', its greater than 0.5');
}

/* Crear una variable “Age” que contenga un número entero entre 0 y 100 y muestre los siguientes mensajes de alerta:
“Bebe” si la edad es menor a 2 años
“Niño” si la edad es entre 2 y 12 años
“Adolescente” entre 13 y 19 años
“Joven” entre 20 y 30 años
“Adulto” entre 31 y 60 años
“Adulto mayor” entre 61 y 75 años
“Anciano” si es mayor a 75 años. */
console.log('\n-Excercise 4.b');
age = Math.random()*100;
console.log(age);
if ( age < 2 ) {
    alert('Your age is ' + age.toFixed(0) + ', so you are a: Bebe');
    } else if ( age < 12 && age > 2 ) {
        alert('Your age is ' + age.toFixed(0) + ', so you are a: Niño');
        }else if ( age < 20 && age > 12 ) {
            alert('Your age is ' + age.toFixed(0) + ', so you are an: Adolescente');
            }else if ( age < 31 && age > 19) {
                alert('Your age is ' + age.toFixed(0) + ', so you are a: Joven');
                }else if ( age < 61 && age > 30) {
                    alert('Your age is ' + age.toFixed(0) + ', so you are an: Adulto');
                    }else if ( age < 75 && age > 60) {
                        alert('Your age is ' + age.toFixed(0) + ', so you are an: Adulto mayor');
                        }else {
                            alert('Your age is ' + age.toFixed(0) + ', so you are an: Anciano');
                        }