import Ciudadano from "../Logica/Ciudadano.js";
import Cliente from "../Logica/Cliente.js";
import Empleado from "../Logica/Empleado.js";
import Extranjero from "../Logica/Extranjero.js";

class App {
    constructor(){
        this.personas = [];
    }

    CargarDatos(json){
        this.ParsearDatos(json);
    }
    ParsearDatos(json) {
        const datos = JSON.parse(json);

        this.personas = datos.map((persona) => {
            const esCiudadano = persona.dni;
            const esExtranjero = persona.paisOrigen;
            
            // Comprueba el tipo de Vehiculo
            if (esCiudadano) {
                return new Ciudadano(
                    persona.id,
                    persona.nombre,
                    persona.apellido,
                    persona.fechaNacimiento,
                    persona.dni,
                );
            }
            else if(esExtranjero)
            {
                return new Extranjero(
                    persona.id,
                    persona.nombre,
                    persona.apellido,
                    persona.fechaNacimiento,
                    persona.paisOrigen,
                );                
            }
        });
    }
}

export default App;