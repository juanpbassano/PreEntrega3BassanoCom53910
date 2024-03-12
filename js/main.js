//Delaracion de variables de usuario y contraseña para el login
let usuarioIngresado = "",
    nombre = "",
    apellido = "",
    email = "",
    usuario = "",
    contraseña;
let intentos = 3,
    log = false;
const todosLosProductos = [],
    carrito = [];
let aPagar = 0,
    nombreIn,
    cantidad,
    stockrestar = 0,
    prod;


//TRAE LOS VALORES DE LOS INPUT Y EJECUTA LA FUNCION LOGIN
const inUsuario = document.getElementById('user'),
    formu = document.getElementById('form-login'),
    inPass = document.getElementById('pass');
formu.addEventListener('submit', (e) => {
    e.preventDefault();
    login(inUsuario.value, inPass.value);
});
//FUNCION PARA LOGIN
function login(inusuario, inPass) {
    //Me traigo datos del sessionStorage generado en el html formulario
    const datosUsuarioJSON = sessionStorage.getItem('nuevoRegistro'),
        datosUsuario = JSON.parse(datosUsuarioJSON);
    if (!datosUsuario) {
        alert('Debe crear un usuario primero');
        return;
    }
    nombre = datosUsuario.nombre,
        apellido = datosUsuario.apellido,
        email = datosUsuario.email,
        usuario = datosUsuario.user,
        contraseña = datosUsuario.contraseña;
    if (usuario === inusuario && contraseña === inPass) {//verificacion de usuario y pass
        log = true;
        alert("LOGIN CORRECTO. AHORA TIENES ACCESO AL Script");
        //aqui guarda usuario y contraseña en local si esta el chek
        const recordar = document.getElementById('check').checked;
        if (recordar) {
            sessionStorage.setItem('user', usuario);
            sessionStorage.setItem('pass', contraseña);
            sessionStorage.setItem('log', log);
            sessionStorage.setItem('recordar', true);
        } else {
            sessionStorage.removeItem('usuario');
            sessionStorage.removeItem('contraseña');
            sessionStorage.removeItem('recordar');
        }
    } else {
        intentos -= 1;
        alert("Usuario o Contraseña incorrecta!\nIngrese nuevamente. Le quedan: " + intentos + " intentos.");
    }
    if (!log && intentos === 0) {
        alert("Se agotaron los intentos. Intente nuevamente más tarde.");
        return;
    }
}

//-----------------------------------------------------------------------------------
//crear productos
//-----------------------------------------------------------------------------------

//Traigo del seccion si el log fue correcto, por si el usuario desea seguir 
//comprando tenga guardado el acceso correcto
datosUsuarioJSON = sessionStorage.getItem('nuevoRegistro'),
        datosUsuario = JSON.parse(datosUsuarioJSON);
const logJSON= sessionStorage.getItem('log');
log=JSON.parse(logJSON);
//Condicional para poder ejecutar los botones
if (!log) {
    alert("Debe Logearse correctamente para poder ejecutar los botones del HTML");
}

//Constructor de nuevo producto
class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

const producto1 = new Producto("arroz", 2000, 10);
const producto2 = new Producto("fideos", 1500, 15);
const producto3 = new Producto("atun", 3000, 5);
const producto4 = new Producto("pan", 2000, 40);
const producto5 = new Producto("cafe", 8500, 20);
const producto6 = new Producto("cerveza", 2200, 12);
todosLosProductos.push(producto1, producto2, producto3, producto4, producto5, producto6);

// seccion para que el usuario cargue  un nuevo producto

const btnNuevoPro = document.getElementById('btn-ingNuevo');
btnNuevoPro.addEventListener('click', () => {
    const nombreP = document.getElementById('nombreP'),
        precioP = document.getElementById('precioP'),
        stockP = document.getElementById('stockP');
    IngresoDeProductos(nombreP.value.toLowerCase(), precioP.value, stockP.value);
});
//funcion que crea el producto nuevo
function IngresoDeProductos(nombreP, precio, stock) {
    if (log) {
        if (!existeProducto(nombreP)) {
            agregarProducto(nombreP, precio, stock);
        } else {
            const producto = obtenerProducto(nombreP);
            continuar = prompt(nombreP + ' ya existe en la lista de productos y hay ' + producto.stock +
                ' en Stock.\nDesea agregar ' + stock + ' stock?\n[ s | n ]');
            while (continuar.toLowerCase() != "s" && continuar.toLowerCase() != "n") {
                continuar = prompt('Ingrese solo la letra S o letra N ').toLowerCase();
            }
            (continuar === "s") ? ( //Operador ternario
                producto.stock += parseInt(stock),
                modificarStockYHtml(producto, producto.stock, nombreP)
            ) : null; //DUDA CON EL NULL
            /*         if (continuar == "s") {
                        producto.stock += parseInt(stock);
                        modificarStockYHtml(producto, producto.stock, nombreP)
                    }  */
        }
    }
}

//retorna si hay algun nombre de producto igual al nombre del prompt
function existeProducto(nombre) {
    return todosLosProductos.some(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
}
//devuelve el primer producto encontrado
function obtenerProducto(nombre) {
    return todosLosProductos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
}
// Crea una nueva instancia de Productos con los datos proporcionados por el usuario
//y se agrega al array de todos los productos.
function agregarProducto(nombreP, precio, stock) {
    const nuevoProducto = new Producto(nombreP.toLowerCase(), parseInt(precio), parseInt(stock));
    todosLosProductos.push(nuevoProducto);
    creaProductoNuAlHTML(nuevoProducto);
    return nuevoProducto;
}
//Funcion que genera los valores del selecteor de stock
function generarOpciones(stock) {
    let option = "";
    for (let i = 1; i <= stock; i++) {
        option += `<option value="${i}"> ${i} </option>`;
    }
    return option
}
//funcion que modifica el stock si se ingresa nuevamente el mismo producto y modifica el html actualizado
function modificarStockYHtml(producto, stock, nombreP) {
    const canti = document.getElementById(`${nombreP}-cantidad`),
        stockDispo = document.getElementById(`${nombreP}-stockDispo`);
    stockDispo.innerText = `Stock disponible: ${producto.stock}`;
    canti.innerHTML = generarOpciones(producto.stock);
}

//Funcion que genera el bloque de html con los datos e ids especificos
function bloqueHtml(Producto) {
    return `<div class="card">
                <h3>${Producto.nombre.charAt(0).toUpperCase() + Producto.nombre.slice(1)}</h3>
                <p>Precio:$${Producto.precio}</p>
                <p id='${Producto.nombre.toLowerCase()}-stockDispo'>Stock disponible: ${Producto.stock}</p>
                <div id="${Producto.nombre.toLowerCase()}-selector">
                    <label for="${Producto.nombre.toLowerCase()}-cantidad"> Seleccina unidades</label>
                    <select name="" id="${Producto.nombre.toLowerCase()}-cantidad">
                    ${generarOpciones(Producto.stock)}
                    </select>
                    <button id="btnComprar-${Producto.nombre.toLowerCase()}" class="btnComprar">Agregar al carrito</button>
                </div>
            </div>`;
}
//funcion que inserta al html, el nuevo rpoducto ingresado por los inputs
function creaProductoNuAlHTML(nuevoProducto) {
    const contenedor = document.getElementById('ProductosDisponibles');
    const nuevosPro = document.createElement('li');
    nuevosPro.innerHTML = bloqueHtml(nuevoProducto)
    contenedor.append(nuevosPro);
    escucharAgregar(nuevoProducto);
}

//inserta etiquetas listas al html con los productos
function crearProductosAlHTML() {
    const contenedor = document.getElementById('ProductosDisponibles');
    todosLosProductos.forEach(Producto => {
        const nuevosPro = document.createElement('li');
        nuevosPro.innerHTML = bloqueHtml(Producto);
        contenedor.append(nuevosPro);
        escucharAgregar(Producto);
    })
    return
}
//filtrar producto
function buscarProductos(arr, filtro) {
    if (log) {
        const encontrado = arr.find((el) => {
            return el.nombre.includes(filtro);
        });
        return encontrado;
    } else {
        alert('Debe Logearse primero.')
    }
}
//elementos del DOM para realizar el filtrado y luego imprimir el html de cada elemento encontrado
const input = document.getElementById('ingreso');
const btnBuscar = document.getElementById('buscar');
const contenedor = document.getElementById('filtrar');
btnBuscar.addEventListener('click', (e) => {
    e.preventDefault();
    const encontrado = buscarProductos(todosLosProductos, input.value.toLowerCase());
    const liEncontrado = document.createElement('li');
    liEncontrado.innerHTML = bloqueHtml(encontrado);
    contenedor.append(liEncontrado);
    escucharAgregar(encontrado);
    const limpiar = document.getElementById('limpiar');
    limpiar.addEventListener('click', () => {
        liEncontrado.remove()
    })
})


//-----------------------------------------------------------------------------------
//comprar productos
//-----------------------------------------------------------------------------------

function escucharAgregar(Producto) {
    const btnComprar = document.getElementById(`btnComprar-${Producto.nombre.toLowerCase()}`),
        slcStock = document.getElementById(`${Producto.nombre}-cantidad`);
    btnComprar.addEventListener('click', (e) => {
        e.preventDefault()
        cantidad = slcStock.value;
        if (log) {
            agregarAlCarrito(Producto, cantidad, Producto.precio);
        } else {
            alert('Debe Logearse primero.')
        }
    });
}

//funcion que agrega productos al carrito y resta el stock de todosLosProductos
function agregarAlCarrito(Producto, cantidad, precio) {
    if (validarStock(Producto)) {
        prod = carrito.find(item => item.Producto.toLowerCase() === Producto.nombre.toLowerCase());
        if (!prod) {
            carrito.push({ Producto: Producto.nombre, Precio: precio, Unidades: parseInt(cantidad) });
            restarStock(cantidad, Producto);
            imprimeCarrito(carrito);
            modificarStockYHtml(Producto, Producto.stock, Producto.nombre);
        } else if (validarStock(Producto)) {
            prod.Unidades += parseInt(cantidad);
            restarStock(cantidad, Producto);
            modificarStockYHtml(Producto, Producto.stock, Producto.nombre);
            const contUnidades = document.getElementById(`${prod.Producto}-unidades`);
            let nuevasUnidades = innerHTML = `<p>Unidades seleccionadas: ${prod.Unidades}</p>`;
            contUnidades.innerHTML = nuevasUnidades;
        }
        totalAPagar(carrito);
        carritoALocal(carrito)
        return carrito
    }
}
//funciones para cargar los elementos del carrito al localStorage
function carritoALocal(carrito) {
    const prodEnJson = JSON.stringify(carrito);
    localStorage.setItem('carrito', prodEnJson);
}

//funciones para cargar los elementos del localStorage al Html
function cargarCarritoDesdeLocal() {
    const carritoDesdeLocal = localStorage.getItem('carrito');
    if (carritoDesdeLocal) {
        let carritoLocal = JSON.parse(carritoDesdeLocal);
        carritoLocal.forEach(producto => {
            const contCarrito = document.getElementById('carrito'),
                listaCreada = document.createElement('li');
            listaCreada.classList.add(`${producto.Producto}-li`)
            listaCreada.innerHTML = crearCarritoHtml(producto)
            contCarrito.append(listaCreada)
            totalAPagar(carritoLocal);
            eliminarProducto(producto);
        });
    }
}
cargarCarritoDesdeLocal()

//funcion para validar si hay stock sufiente antes de realizar la compra
function validarStock(producto) {
    return (producto.stock <= 0) ? ( //utilizacion de operador ternario
        (alert(`Lo lamento, no tenemos más unidades de ${producto.nombre}`)), false
    ) : true;
}


function restarStock(cantidad, Producto) {
    let productoEncontrado = obtenerProducto(Producto.nombre);
    if (productoEncontrado) {
        if (productoEncontrado.stock >= parseInt(cantidad)) {
            productoEncontrado.stock -= parseInt(cantidad);
        }
    }
}

function imprimeCarrito() {
    let ultimo = carrito[carrito.length - 1];
    const contCarrito = document.getElementById('carrito'),
        listaCreada = document.createElement('li');
    listaCreada.classList.add(`${ultimo.Producto}-li`)
    listaCreada.innerHTML = crearCarritoHtml(ultimo)
    contCarrito.append(listaCreada)
    eliminarProducto(ultimo)
}
//funcion que suma el valor de la cantidad de unidades por el precio de  cada item del carrito
function totalAPagar(carrito) {
    aPagar = carrito.reduce((total, producto) => total += (producto.Unidades * producto.Precio), 0)
    const parrafo = document.getElementById('total');
    parrafo.innerText = `Total a pagar: $${aPagar}`;
    return aPagar
}
// llama a la funcion que crea los productos que estan en el array todosLosProductos.

crearProductosAlHTML();

function crearCarritoHtml(Producto) {
    return `<div id="${Producto.Producto}-cardCarrito" class="cardCarrito">
    <h3>${Producto.Producto.charAt(0).toUpperCase() + Producto.Producto.slice(1)}</h3>
    <p>Precio unitario: $${Producto.Precio}</p>
    <p id="${Producto.Producto.toLowerCase()}-unidades">Unidades seleccionadas: ${Producto.Unidades}</p>
    <div id="${Producto.Producto.toLowerCase()}-contBoton">
        <button id="btnBorrar-${Producto.Producto.toLowerCase()}" class="btnComprar">Borrar Producto</button>
    </div>
</div>`;
}

//funcion que borra elementos del carrito y del html
function eliminarProducto(Producto) {
    const btnBorrar = document.getElementById(`btnBorrar-${Producto.Producto.toLowerCase()}`);
    btnBorrar.addEventListener('click', () => {
        const cardCarrito = document.querySelector(`.${Producto.Producto}-li`);
        cardCarrito.remove();
        let eliminado = obtenerProducto(Producto.Producto);
        eliminado.stock += Producto.Unidades;
        carrito.pop(eliminado);
        carritoALocal(carrito);
        modificarStockYHtml(eliminado, eliminado.stock, Producto.Producto);
        aPagar -= (Producto.Unidades * Producto.Precio);
        const parrafo = document.getElementById('total');
        parrafo.innerText = `Total a pagar: $${aPagar}`;
    });
}
//funcion que elimina producto por producto agregado al carrito, devuelve el stock a todos los productos y modifica el html
function limpiarCarrito(carrito) {
    const btnlimpiar = document.getElementById('btnlim');
    btnlimpiar.addEventListener('click', () => {
        carrito.forEach((producto) => {
            const cardCarrito = document.querySelector(`.${producto.Producto}-li`);
            cardCarrito.remove();
            const productoEncontrado = obtenerProducto(producto.Producto);
            productoEncontrado.stock += producto.Unidades;
            modificarStockYHtml(productoEncontrado, productoEncontrado.stock, producto.Producto);
        });
        aPagar = 0;
        const parrafo = document.getElementById("total");
        parrafo.innerText = `Total a pagar: $${aPagar}`;
        localStorage.removeItem("carrito");
        carrito.length = 0;
    });
}

limpiarCarrito(carrito);

