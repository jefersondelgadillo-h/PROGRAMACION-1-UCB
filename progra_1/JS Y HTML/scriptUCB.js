function mostrarNombre() {
  const nombre = document.getElementById("nombres").value;
  const resultado = document.getElementById("resultado");

  if (nombre.trim() === "") {
    resultado.textContent = "Por favor, escribe tu nombre.";
  } else {
    resultado.textContent = "Hola, " + nombre + " 👋";
  }
}

var lista = []; //Variable Global

function InsertarLista() {
  //const nombre = document.getElementById("nombres").value;
  var valorAleatorio = Math.floor(Math.random() * 10);
  const resultado = document.getElementById("resultado");

  lista.push(valorAleatorio);

  // Crear nuevo botón
  const nuevoBoton = document.createElement("button");
  nuevoBoton.classList.add("boton-lista");
  nuevoBoton.textContent = valorAleatorio;

  // Agregar al contenedor
  resultado.appendChild(nuevoBoton);

  // Forzar animación CSS con un pequeño retraso
  setTimeout(() => {
    nuevoBoton.classList.add("visible");
  }, 10);
}
//lista=[8,10,6,7,8,10,10,5,...]
function EliminarElemetoLista(){
  //El valor del elemento (pedir el input al usuario)
const input= document.getElementById("input").value;
//El elemento esta incluido en la lista?
while(lista.includes(input)){
    consolelog("El input esta incluido en la lista")
    var pos= lista.indexOf(input);
consolelog("El input esta incluido en la posicion:",pos)
    lista= lista.splice(pos,1);
    consolelog("Input eliminado ----- :",input)
}
console,log("Lista actualizada !!!")
console,log(lista.toString())
  //actualizar la lista
}
ListaObjeto= [
  {nombre:"Benjahmin Coca",edad:15,correo:"jmedina@ycb.edu.bo",carrera:"MEDICINA",telefono:"75093476" },
  {nombre:"Marco Lopez",edad:21,correo:"mlopex@ycb.edu.bo",carrera:"DERECHO",telefono:"66289165" },
  {nombre:"Juan Medina",edad:17,correo:"mmateo@ycb.edu.bo",carrera:"MEDICINA",telefono: "77778"}
]

function AddEstudiante (){
  var name = document.getElementById("input_name").value;
  var edad= Number(document.getElementById("input_edad").value);
  var correo= document.getElementById("input_correo").value;
  var Carrera= document.getElementById("input_carrera").value;
  var correo= document.getElementById("input_correo").value;

  var estudiante = {
    nombre: varName,
    edad: varEdad,
    correo: varcorreo,
    carrera: varcarrera,
    telefono: varPhone
  }
if (estudiante.edad>=18){
 console.log("INSERTADO CON EXITO!!!"); 
ListaObjeto.push(estudiante);
}else{
  console.log ("Ahorita no joven,vuelve cuando tengas 18 años");
}
console.log(ListaObjeto);
}

function MostrarHabilitadosOEP(){
  ListaObjeto.forEach(elemento =>{
    if(elemento.edad>= 18){
      console.log("Hola,"+ elemento.nombre +"estas habilitado para votar:)");
    }
  });
}
function MostrarNombre(){
  ListaObjeto.forEach(element =>{
    console.log(2025 -element.edad);
  });
}


