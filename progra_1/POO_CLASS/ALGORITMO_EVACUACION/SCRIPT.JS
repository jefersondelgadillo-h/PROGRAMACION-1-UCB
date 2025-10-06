
// La clase Pasajero
class Pasajero {
  constructor(nombre, edad, genero, tipoBoleto) {
    this.nombre = nombre;
    this.edad = edad;
    // normalizo género: 'Femenino' o 'Masculino'
    this.genero = genero === 'Femenino' ? 'Femenino' : 'Masculino';
    // tipoBoleto: '1ra Clase', '2da Clase', '3ra Clase'
    this.tipoBoleto = tipoBoleto;
  }
  // Método que muestra la info del pasajero de forma legible
  mostrarInfo() {
    return `${this.nombre} | ${this.edad} años | ${this.genero} | ${this.tipoBoleto}`;
  }
}

// Crear una lista de pasajeros
// (varios pasajeros con distintas características)

const listaPasajeros = [
  new Pasajero('Rose', 22, 'Femenino', '1ra Clase'),
  new Pasajero('Jack', 28, 'Masculino', '3ra Clase'),
  new Pasajero('Molly', 65, 'Femenino', '2da Clase'),
  new Pasajero('Tom', 55, 'Masculino', '2da Clase'),
  new Pasajero('Lucy', 8, 'Femenino', '3ra Clase'),
  new Pasajero('Mr. Andrews', 45, 'Masculino', '1ra Clase'),
  new Pasajero('Mrs. Brown', 70, 'Femenino', '1ra Clase'),
  new Pasajero('Sam', 17, 'Masculino', '3ra Clase'),
  new Pasajero('Ellen', 30, 'Femenino', '2da Clase'),
  new Pasajero('Harry', 40, 'Masculino', '2da Clase'),
  new Pasajero('Ned', 12, 'Masculino', '3ra Clase'),
  new Pasajero('Agnes', 50, 'Femenino', '3ra Clase')
];

// La clase BoteRescate
class BoteRescate {
  Capacidad = 0;
  ListaOcupantes = [];

  constructor(paramCapacidad, paramListaPasajeros = []) {
    this.Capacidad = paramCapacidad;
    // clonamos la lista para evitar aliasing
    this.ListaOcupantes = paramListaPasajeros.slice();
  }

  agregarPasajero(pasajero) {
    if (this.ListaOcupantes.length < this.Capacidad) {
      this.ListaOcupantes.push(pasajero);
      return true;
    }
    return false;
  }

  // muestra ocupantes en formato legible
  mostrarOcupantes() {
    if (this.ListaOcupantes.length === 0) {
      return `${this.constructor.name} ${this.Capacidad} - vacío (capacidad ${this.Capacidad})`;
    }
    const lineas = this.ListaOcupantes.map((p, i) => `${i + 1}. ${p.mostrarInfo()}`);
    return `Bote (capacidad ${this.Capacidad})\n` + lineas.join('\n');
  }
}

// Algoritmo de evacuación
// - Orden de prioridad: GÉNERO -> EDAD -> TIPO DE BOLETO
//   (Género: Femenino antes que Masculino)
//   (Edad: mayores primero)
//   (Tipo boleto: 1ra > 2da > 3ra)
// - Asigna pasajeros al primer bote con espacio (orden de botes dado)
// - Informa quién quedó fuera

function ordenarPasajeros(pasajeros) {
  const prioridadTipo = { '1ra Clase': 3, '2da Clase': 2, '3ra Clase': 1 };
  // hacemos copia y ordenamos según la regla pedida
  return pasajeros.slice().sort((a, b) => {
    // 1) género: Femenino antes que Masculino
    if (a.genero !== b.genero) {
      return a.genero === 'Femenino' ? -1 : 1;
    }
    // 2) edad: mayores primero
    if (a.edad !== b.edad) {
      return b.edad - a.edad;
    }
    // 3) tipo boleto: 1ra > 2da > 3ra
    const pa = prioridadTipo[a.tipoBoleto] || 0;
    const pb = prioridadTipo[b.tipoBoleto] || 0;
    return pb - pa;
  });
}

function evacuar(pasajeros, botes) {
  const ordenados = ordenarPasajeros(pasajeros);
  const quedaronFuera = [];

  for (const p of ordenados) {
    let subio = false;
    for (const bote of botes) {
      if (bote.agregarPasajero(p)) {
        subio = true;
        break;
      }
    }
    if (!subio) {
      quedaronFuera.push(p);
    }
  }

  return { botes, quedaronFuera, ordenAplicado: ordenados };
}

// ==============================
// Ejecutar la simulación
// ==============================
function simulacion() {
  // crear botes con distintas capacidades (orden de botes importante)
  const botes = [
    new BoteRescate(4), // Bote 1
    new BoteRescate(3), // Bote 2
    new BoteRescate(2)  // Bote 3
  ];

  // ejecutamos la evacuación con la lista creada arriba
  const resultado = evacuar(listaPasajeros, botes);

  // mostrar ocupantes por bote (en orden)
  console.log('=== RESULTADO EVACUACIÓN (por botes) ===\n');
  resultado.botes.forEach((bote, idx) => {
    console.log(`Bote ${idx + 1}:`);
    console.log(bote.mostrarOcupantes());
    console.log('-------------------------------');
  });

  // mostrar quién quedó fuera
  console.log('\n=== PASAJEROS QUE QUEDARON FUERA ===\n');
  if (resultado.quedaronFuera.length === 0) {
    console.log('Nadie quedó fuera 👍');
  } else {
    resultado.quedaronFuera.forEach((p, i) => {
      console.log(`${i + 1}. ${p.mostrarInfo()}`);
    });
    console.log(`\nTotal fuera: ${resultado.quedaronFuera.length}`);
  }

  // opcional: mostrar orden aplicado de prioridad (útil para revisar)
  console.log('\n=== ORDEN APLICADO (Género → Edad → TipoBoleto) ===');
  resultado.ordenAplicado.forEach((p, i) => {
    console.log(`${i + 1}. ${p.mostrarInfo()}`);
  });
}

// correr la simulación
simulacion();
