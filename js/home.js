// Funcion para volver al menu principal

const home = () => {
    // Obtener el elemento main
    const main = document.getElementById("main");

    //Borrar lo anterior
    main.innerHTML = "";

    // Agregar la nueva información
    main.innerHTML = `
    
        <section id="principal">
            <div class="wrp">
                <div class="bg">
    
                </div>
                <div class="content">
                    <div class="info">
                        <h1>Policie of Villa Chica</h1>
                        <br>
                        <p>Departament of justice</p>
                    </div>
                </div>
                <div class="wave">
                    <img src="img/wave.svg" alt="fondo">
                </div>
            </div>
        </section>
  
    `
}