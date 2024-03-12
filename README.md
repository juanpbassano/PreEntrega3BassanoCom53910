#Script simulador de miniMarket
***
El siguiente script se desarrollo para poder ingresar nuevos productos al stock, imprimirlos en el DOM y luego poder agregarlos al carrito de compras , previamente loggeado correctamente.
En primer lugar se creo un html de loggeo donde se almacenan los datos en el sessionStorage para usarlo como base de datos y poder comprarlos con los ingresados por el usuario en la pagina principal. 
En la pag principal se guardaron los datos del registro del usuario junto con un log para que cuando se vuelva a esa pagina no pida logearse nuevamente. 
Se utilizo un bucle while para darle 3 intentos al usuario de loggearse. Dentro del while se utilizaron condicionarles if y else para corroborar el usuario y contraseña ingresados. 
Una vez que el log fue correcto te deja presionar los botones del html para que puedan coorer las funciones de agregar nuevos productos, filtrar los que ya estan y el carrito de compra. 
La funcion IngresoDeProductos es la encargada de pedir al usuario algunos parametros ingresados por prompt para crear nuevos objetos junto con la clase constructora (Productos) Estos productos nuevos quedan agregados al array todosLosProductos el cual ya tenia algunos productos predefinidos.
La funcion agregarAlCarrito primero valida si el stock de todosLosProductos es suficiente para ser agregado. se pushea el array carrito con el producto y la cantidad deseada. Se imprime en el html la nueva card representando al elemento comprado. Junto a sus unidades y valor de la misma.
luego se guarda el array carrito en el localstorage para no perder los productos agregados. 
Por ultimo se ejecuta una funcion que suma el valor de los productos ingresados por la cantidad de los mismos dando como resultado el total a pagar. 
