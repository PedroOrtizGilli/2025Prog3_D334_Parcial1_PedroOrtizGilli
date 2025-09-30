//Lista de frutas
const listaFrutas = [
  { id: 1, nombre: "Anana", precio: 250, imagen: "img/anana.jpg" },
  { id: 2, nombre: "Arandano", precio: 180, imagen: "img/arandano.jpg" },
  { id: 3, nombre: "Banana", precio: 220, imagen: "img/banana.jpg" },
  { id: 4, nombre: "Frambuesa", precio: 200, imagen: "img/frambuesa.png" },
  { id: 5, nombre: "Frutilla", precio: 190, imagen: "img/frutilla.jpg" },
  { id: 6, nombre: "Kiwi", precio: 300, imagen: "img/kiwi.jpg" },
  { id: 7, nombre: "Mandarina", precio: 450, imagen: "img/mandarina.jpg" },
  { id: 8, nombre: "Manzana", precio: 270, imagen: "img/manzana.jpg" },
  { id: 9, nombre: "Naranja", precio: 500, imagen: "img/naranja.jpg" },
  { id: 10, nombre: "Pera", precio: 350, imagen: "img/pera.jpg" },
  { id: 11, nombre: "Pomelo amarillo", precio: 380, imagen: "img/pomelo-amarillo.jpg" },
  { id: 12, nombre: "Pomelo rojo", precio: 400, imagen: "img/pomelo-rojo.jpg" },
  { id: 13, nombre: "Sandia", precio: 320, imagen: "img/sandia.jpg" }
];

//Variables
const contenedorDatosAlumno = document.getElementById("datos_alumno");
const contenedorListaFrutas = document.getElementById("seccion_frutas");
const contenedorBuscador = document.getElementById("buscador");
const contenedorCarrito = document.getElementById("seccion_carrito");
const contador = document.getElementById("contador_carrito");
let carrito = [];
let htmlCarrito = "";

//Listeners
contenedorBuscador.addEventListener("input", filtrarProductos);

//funciones
function imprimirDatosAlumno(){
    const datosAlumno = {
        nombre: "Pedro Alejandro",
        apellido: "Ortiz Gilli"
    }
    console.log(`${datosAlumno.nombre} ${datosAlumno.apellido}`)
    contenedorDatosAlumno.innerHTML = `${datosAlumno.nombre} ${datosAlumno.apellido}`;
}

function mostrarFrutas(listaFr){
    let frutasHTML = "";
    listaFr.forEach(fruta => {
        frutasHTML += `
            <div class="card_producto">
                <img src="${fruta.imagen}" alt="${fruta.nombre}">
                <h3>${fruta.nombre}</h3>
                <p>$${fruta.precio}</p>
                <button id="boton_agregar_al_carrito" onclick="agregarAlCarrito(${fruta.id})">Agregar al carrito</button>
            </div>
        `
    })
    contenedorListaFrutas.innerHTML = frutasHTML;
}

function filtrarProductos(){
    const textoBusqueda = contenedorBuscador.value.toLowerCase();
    const frutasFiltradas = listaFrutas.filter(fruta => {
        return fruta.nombre.toLowerCase().includes(textoBusqueda)
    });
    mostrarFrutas(frutasFiltradas);
}

function agregarAlCarrito(idFruta){
    const frutaElegida = listaFrutas.find(fruta => fruta.id === idFruta);
    carrito.push(frutaElegida);
    mostrarCarrito();
}

function mostrarCarrito(){
    let totalCarrito = 0;
    htmlCarrito = "<ul>";
    carrito.forEach(item => {
        htmlCarrito += `
            <li class="bloque_item">
                <p class="nombre_item">${item.nombre} - ${item.precio}</p>
                <button class="boton_eliminar" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
            </li>
        `
        totalCarrito += item.precio;
    })
    htmlCarrito += `
        </ul>
        <p id="total_carrito"> Total: $${totalCarrito}</p>
        <button id="boton_vaciar_carrito" onclick="vaciarCarrito()">Vaciar</button>
    `
    contenedorCarrito.innerHTML = htmlCarrito;
    console.log(carrito);
    if(!(carrito.length < 1)){
        actualizarCarrito();
    }
    actualizarContadorCarrito();
}

function vaciarCarrito(){
    carrito = [];
    mostrarCarrito();
    actualizarContadorCarrito();
}

function eliminarDelCarrito(idFruta){
    carrito = carrito.filter(item => item.id !== idFruta);
    mostrarCarrito();
    actualizarCarrito();
    actualizarContadorCarrito();
}

function cargarCarrito(){
    let textoCarritoLeido = localStorage.getItem("carrito");
    if(!textoCarritoLeido){
        localStorage.setItem("carrito", []);
    } else {
        carrito = JSON.parse(textoCarritoLeido);
        mostrarCarrito();
        actualizarContadorCarrito();
    }
}

function actualizarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContadorCarrito(){
    contador.textContent = carrito.length;
    if(carrito.length === 0){
        contenedorCarrito.innerHTML = "<p>Carrito vacio</p>";
    }
}

function init(){
    imprimirDatosAlumno();
    mostrarFrutas(listaFrutas);
    cargarCarrito();
}

init();

