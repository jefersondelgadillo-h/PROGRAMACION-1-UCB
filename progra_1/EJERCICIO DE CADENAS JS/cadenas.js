function ContarPalabras(texto){
	var contar = 0;
	texto.split(' ').forEach(element => {
    	contar++;    
    });
    console.log(contar);
}
/*
var texto = "Presta atención Rafael";
ContarPalabras(texto);
*/// Función que cuenta vocales en una cadena
function ContarCaracteres(texto){
	var resultado = 0;
    texto.split('').forEach(element => {
    	resultado++;
    });
    console.log(resultado);
}
var texto = "hola mundo";

ContarCaracteres(texto);
function ContarVocales(palabra){
    var contarVocales = 0;
    palabra.split('').forEach(element => {    
        if(element == 'a' || element == 'A'){
            contarVocales++;
        }
        if(element == 'e' || element == 'E'){
            contarVocales++;
        }
        if(element == 'i' || element == 'I'){
            contarVocales++;
        }
        if(element == 'o' || element == 'O'){
            contarVocales++;
        }
        if(element == 'u' || element == 'U'){
            contarVocales++;
        }
    });
    console.log(contarVocales);
}

var palabra = "Hola Mundo";
ContarVocales(palabra);
 
