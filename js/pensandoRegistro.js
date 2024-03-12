const guardarUsuario ={usuario:usuario,pass:contraseña},
    usuEnJason=JSON=stringify(guardarUsuario);
    localStorage.setItem("usuario",usuEnJason);

const recordar = document.getElementById('check');
recordar.addEventListener('check',()=>{
    if (recordar) {
        console.log(recordar.value);
    }
})