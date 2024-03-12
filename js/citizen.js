// Array de los ciudadanos
const citizenData = [];

// Funcion para cargar los datos de los ciudadanos
const loadCitizens = async () => {
    try {
        // Intenta hacer una solicitud fetch a una URL específica.
        const response = await fetch('http://localhost:3000/ciudadanos');
        // Verifica si la respuesta no es exitosa y lanza un error si es necesario.
        if (!response.ok) {
            throw new Error('Error at the moment to load citizens. Status: ', response.status);
        }
        // Convierte la respuesta de la API a formato JSON.
        const citizen = await response.json();
        // Añade los programas cargados al arreglo definido previamente.
        citizenData.push(...citizen);
        // Imprimimos la información de la lista
        console.log(citizenData);
    } catch (error) {
        // Captura cualquier error que ocurra durante la solicitud o procesamiento de datos y lo imprime en la consola.
        console.error("Error at the moment to load citizen: ", error.message);
    }
}

// Función para cargar el formulario
const citizenForm = () => {
    // Obtenemos el elemento div con el id "main"
    const main = document.getElementById("main");

    // Borramos todo el contenido anterior dentro de main
    main.innerHTML = "";

    // Agregamos la nueva información
    main.classList.add("p-5","mt-5")
    main.innerHTML = `
    <form> 
    <h1>Create new person</h1>
    <hr>
    <!-- name -->
    <div class="mb-3 row">
        <label for="citizenName" class="col-4 col-form-label">Name</label>
        <div class="col-8">
            <input type="text" class="form-control" id="citizenName" placeholder="Alhan" required />
        </div>
    </div>

    <!-- Adn Number -->
    <div class="mb-3 row">
        <label for="citizenAdn" class="col-4 col-form-label">DNA</label>
        <div class="col-8">
            <input type="number" class="form-control" id="citizenAdn" placeholder="101000000100101"
                maxlength="20" required />
        </div>
    </div>

    <!-- Adress -->
    <div class="mb-3 row">
        <label for="citizenAdress" class="col-4 col-form-label">Adress</label>
        <div class="col-8">
            <input type="text" class="form-control" id="citizenAdress"
                placeholder="Cra. 18 #1-2 Barrio El Churco" required />
        </div>
    </div>

    <!-- Phone -->
    <div class="mb-3 row">
        <label for="citizenPhoneNumber" class="col-4 col-form-label">Phone number</label>
        <div class="col-8">
            <input type="text" class="form-control" id="citizenPhoneNumber" placeholder="3104567894"
                required />
        </div>
    </div>

    <hr>
        <button class="btn btn-success mt-3"  type="button" onclick="addPerson()">Add Person</button>
        
    </form>
    `
};

// Funcion para guardar datos de una persona creada
const saveNewData = async (newPerson) => {
    try {
        const response = await fetch('http://localhost:3000/ciudadanos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPerson),
        });

        if (!response.ok) {
            throw new Error(`Error al crear el sujeto. Estado: ${response.status}`);
        }
        const personCreated = await response.json();
        console.log('sujeto creado:', personCreated);
    } catch (error) {
        alert(`Error al crear el sujeto: ${error.message}`);
    }

}

// Funcion para agregar una nueva persona a la base de datos
const addPerson = async () => {
    // Obtenemos la información agregada
    const name = document.getElementById("citizenName").value.trim();
    const adn = document.getElementById("citizenAdn").value.trim();
    const adress = document.getElementById("citizenAdress").value.trim();
    const phone = document.getElementById("citizenPhoneNumber").value.trim();

    // Verificacion de campos vacios
    if (
        !name ||
        !adn ||
        !adress ||
        !phone
    ){
        alert("Make sure to add valid assignation")
        return
    }

    // Verificar si la secuencia de ADN ya existe en la lista
    const existingPerson = citizenData.find(person => person.codigo_adn === adn);
    if (existingPerson) {
        alert("The entered DNA sequence already exists in the database. Please enter a unique sequence.");
        return;
    }

    // Creamos un objeto con la informacion del sujeto
    const newPerson = {
        id: citizenData.length + 1,
        nombre_completo: name,
        direccion: adress,
        celular: phone,
        codigo_adn: Number(adn)
    };

    // Llamamos a la funcion que se encarga de guardar la info en la base de datos
    await saveNewData(newPerson);

    // Si todo funcionó correctamente, lanzamos el alerta
    alert("Person succesfully created!");
}
