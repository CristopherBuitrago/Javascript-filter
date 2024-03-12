// Formulario para analizar

const analizeForm = () => {
    // Obtenemos el elemento div con el id "main"
    const main = document.getElementById("main");

    // Borramos todo el contenido anterior dentro de main
    main.innerHTML = "";

    // Agregamos la nueva información
    main.classList.add("p-5","mt-5")
    main.innerHTML = `
    <form >
        <h1>Analize DNA</h1>
        <hr>
        <input type="text" class="form-control" id="adnInsert" placeholder="Insert DNA: 100010100101...." required />
        <button class="btn btn-danger mt-3" type="button" onclick="suspicious()">Send</button>
        <hr>
    </form>

    <div id="results">
        <h2>Results:</h2>
        <ul id="persons"></ul>
    </div>
    `
}

// Funcion para encontrar el culpable
const suspicious = () => {
    // Obtenemos la secuencia de ADN ingresada por el usuario
    const dnaSequence = document.getElementById("adnInsert").value.trim();
    
    // Verificamos que la secuencia de ADN tenga una longitud válida
    if (dnaSequence.length !== 20) {
        alert("La secuencia de ADN debe tener una longitud de 20 caracteres.");
        return;
    }

    // Convertimos la secuencia de ADN a un array de números
    const dnaArray = Array.from(dnaSequence).map(Number);

    // Calculamos la similitud entre la secuencia de ADN ingresada y las de la lista
    const similarities = [];
    for (const citizen of citizenData) {
        let similarity = 0;
        for (let i = 0; i < 20; i++) {
            if (citizen.codigo_adn[i] == dnaArray[i]) {
                similarity++;
            }
        }
        similarity = (similarity / 20) * 100;
        similarities.push({ name: citizen.nombre_completo, similarity: similarity });
    }

    // Ordenamos las similitudes de mayor a menor
    similarities.sort((a, b) => b.similarity - a.similarity);

    // Mostramos los resultados
    const personsList = document.getElementById("persons");
    personsList.innerHTML = "";
    similarities.slice(0, 5).forEach(person => {
        const listItem = document.createElement("li");
        listItem.textContent = `${person.name} ${person.similarity.toFixed(2)}%`;
        personsList.appendChild(listItem);
    });
};
