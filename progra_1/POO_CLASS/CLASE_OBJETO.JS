class Pasajero {
//Atributos de la clase, con valores por defecto
nombre= "";
edad= 0;
genero="";
tipo_boleto="";

//Constructor
constructor (paramNombre, paramEdad, paramGenero, paramTipoBoleto){
    this.nombre= paramNombre;
    this.edad= paramEdad;
    this.genero= paramGenero;
    this.tipo_boleto= paramTipoBoleto;
}


//Setters
SetNombre(paramNombre) {this.nombre=  paramNombre;}
SetEdad(paramEdad) {this.edad=  paramEdad;}
SetGenero(paramGenero) {this.genero=  paramGenero;}
SetTipoBoleto(paramTipoBoleto) {this.tipo_boleto= paramTipoBoleto; }


//Getters
GetNombre(){ return this.nombre; }
GetEdad(){ return this.edad; }
GetGenero(){ return this.genero; }
GetTipoBoleto(){ return this.tipo_boleto; }

//Mostrar los valores de los atributos
ToString (){
    return "Pasajero:" +
    "Nombre:"+ this.GetNombre()+
    "Edad: "+ this.GetEdad()+
    "Genero: "+ this.GetGenero()+
    "Tipo de Boleto: "+ this.tipo_boleto();

}

}