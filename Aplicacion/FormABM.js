import Ciudadano from "../Logica/Ciudadano.js";
import Extranjero from "../Logica/Extranjero.js";

class FormABM{

    constructor(id, tabla){
        this.form = document.getElementById(id);
        this.alta = document.getElementById("alta_abm");
        this.modificar = document.getElementById("modificar_abm");
        this.baja = document.getElementById("eliminar_abm");
        this.cancelar = document.getElementById("cancelar_abm");
        this.mostrar = document.getElementById("show_abm");
        this.tabla = tabla;
        this.inputs = {
            id: document.getElementById("id_abm"),
            nombre: document.getElementById("nombre_abm"),
            apellido: document.getElementById("apellido_abm"),
            fechaNacimiento: document.getElementById("fechaNacimiento_abm"),
            tipo: document.getElementById("tipo_abm"),
            dni: document.getElementById("dni_abm"),
            paisOrigen: document.getElementById("paisOrigen_abm")
        };

        this.Init();
    }

    Init(){
        this.mostrar.addEventListener("click", () =>{
            this.form.classList.remove("hidden");
            document.getElementById("table_container").classList.add("hidden");
        });
        this.cancelar.addEventListener("click", () =>{
            this.form.classList.add("hidden");
            document.getElementById("table_container").classList.remove("hidden");
        });

        this.inputs.tipo.addEventListener('change', function(event) {
            const tipo = event.target.value;

            const dni = document.getElementById("dni_abm");
            const paisOrigen = document.getElementById("paisOrigen_abm");

            const parent_pais = paisOrigen.closest(".col-md-12");
            const parent_dni = dni.closest(".col-md-12");
            
            switch (tipo) {
                case "Ciudadano":
                    parent_pais.classList.add("hidden");
                    parent_dni.classList.remove("hidden");
                    break;
            
                case "Extranjero":
                    parent_pais.classList.remove("hidden");
                    parent_dni.classList.add("hidden");
                    break;
            }
        });

        // Maneja el Alta
        this.alta.addEventListener("click", () =>{
            this.inputs = {
                id: document.getElementById("id_abm"),
                nombre: document.getElementById("nombre_abm"),
                apellido: document.getElementById("apellido_abm"),
                fechaNacimiento: document.getElementById("fechaNacimiento_abm"),
                tipo: document.getElementById("tipo_abm"),
                dni: document.getElementById("dni_abm"),
                paisOrigen: document.getElementById("paisOrigen_abm")
            };

            let filtered_inputs = this.inputs;

            switch (this.inputs.tipo.value) {
                case "Ciudadano":
                    delete filtered_inputs.paisOrigen;
                    try {
                        this.ValidarCamposComunes(filtered_inputs);
                        this.ValidarNumMayorA(filtered_inputs.dni.value, 0);
                        
                        const new_id = this.generarNuevoID(this.tabla.registros);
                        this.tabla.registros.push(new Ciudadano(
                            new_id,
                            filtered_inputs.nombre.value,
                            filtered_inputs.apellido.value,
                            filtered_inputs.fechaNacimiento.value,
                            filtered_inputs.dni.value,
                        ));
                        this.tabla.DisplayTabla(["id", "nombre", "apellido", "fechaNacimiento", "dni", "paisOrigen"], "Todos");

                        console.log("Ciudadano creado con exito");
                    } catch (error) {
                        console.log(`Error: ${error.message}`);
                        // throw error;
                    }
                    break;
            
                case "Extranjero":
                    delete filtered_inputs.dni;
                    try {
                        this.ValidarCamposComunes(filtered_inputs);
                        this.ValidarString(filtered_inputs.paisOrigen);
                        this.tabla.registros.push(new Extranjero(
                            this.generarNuevoID(this.tabla.registros),
                            filtered_inputs.nombre.value,
                            filtered_inputs.apellido.value,
                            filtered_inputs.fechaNacimiento.value,
                            filtered_inputs.paisOrigen.value,
                        ));
                        this.tabla.DisplayTabla(["id", "nombre", "apellido", "fechaNacimiento", "dni", "paisOrigen"], "Todos");
                        console.log("Extranjero creado con exito");
                    } catch (error) {
                        console.log(error);
                    }
                    break;
            }
        });

        // Maneja la Baja
        this.baja.addEventListener("click", () =>{
            this.inputs = {
                id: document.getElementById("id_abm"),
                nombre: document.getElementById("nombre_abm"),
                apellido: document.getElementById("apellido_abm"),
                fechaNacimiento: document.getElementById("fechaNacimiento_abm"),
                tipo: document.getElementById("tipo_abm"),
                dni: document.getElementById("dni_abm"),
                paisOrigen: document.getElementById("paisOrigen_abm")
            };

            if(this.inputs.id.value !== null && this.inputs.id.value !== ''){
                try {
                    this.ValidaID(this.inputs.id.value);
                    let index = -1;
                    for(let i = 0; i < this.tabla.registros.length; i++){
                        if(this.tabla.registros[i].id == this.inputs.id.value){
                            index = i;
                            break;
                        }
                    }

                    if (index !== -1) {
                        this.tabla.registros.splice(index, 1);
                        this.tabla.DisplayTabla(["id", "nombre", "apellido", "fechaNacimiento", "dni", "paisOrigen"], "Todos");
                        console.log("Usuario borrado con exito");
                    }
                    else console.log("No se encontro ID");
                } catch (error) {
                    console.log(error);
                }
                
            }
            else console.log("No se ingreso ID");
        });

        // Maneja la Modificacion
        this.modificar.addEventListener("click", () =>{
            this.inputs = {
                id: document.getElementById("id_abm"),
                nombre: document.getElementById("nombre_abm"),
                apellido: document.getElementById("apellido_abm"),
                fechaNacimiento: document.getElementById("fechaNacimiento_abm"),
                tipo: document.getElementById("tipo_abm"),
                dni: document.getElementById("dni_abm"),
                paisOrigen: document.getElementById("paisOrigen_abm")
            };
            let filtered_inputs = this.inputs;

            switch (this.inputs.tipo.value) {
                case "Ciudadano":
                    delete filtered_inputs.paisOrigen;
                    try {
                        this.ValidarCamposComunes(filtered_inputs); 
                        this.ValidarNumMayorA(filtered_inputs.dni.value, 0);
                        let index = -1;
                        for(let i = 0; i < this.tabla.registros.length; i++){
                            if(this.tabla.registros[i].id == this.inputs.id.value){
                                index = i;
                                break;
                            }
                        }
                        if(index != -1){
                            this.tabla.registros[index].nombre = filtered_inputs.nombre.value;
                            this.tabla.registros[index].apellido = filtered_inputs.apellido.value;
                            this.tabla.registros[index].fechaNacimiento = filtered_inputs.fechaNacimiento.value;
                            this.tabla.registros[index].dni = filtered_inputs.dni.value;
                            this.tabla.DisplayTabla(["id", "nombre", "apellido", "fechaNacimiento", "dni", "paisOrigen"], "Todos");
                            console.log("Ciudadano modificado con exito");
                        }
                        else console.log("No se encontro ID");
                    } catch (error) {
                        console.log(error)
                    }
                    break;
            
                case "Extranjero":
                    delete filtered_inputs.dni;
                    try {
                        this.ValidarCamposComunes(filtered_inputs);
                        this.ValidarString(filtered_inputs.paisOrigen);

                        let index = -1;
                        for(let i = 0; i < this.tabla.registros.length; i++){
                            if(this.tabla.registros[i].id == this.inputs.id.value){
                                index = i;
                                break;
                            }
                        }
                        if(index != -1){
                            this.tabla.registros[index].nombre = filtered_inputs.nombre.value;
                            this.tabla.registros[index].apellido = filtered_inputs.apellido.value;
                            this.tabla.registros[index].fechaNacimiento = filtered_inputs.fechaNacimiento.value;
                            this.tabla.registros[index].paisOrigen = filtered_inputs.paisOrigen.value;
                            this.tabla.DisplayTabla(["id", "nombre", "apellido", "fechaNacimiento", "dni", "paisOrigen"], "Todos");
                            console.log("Extrangero modificado con exito");
                        }
                        else console.log("No se encontro ID");
                    } catch (error) {
                        console.log(error);
                    }
                    break;
            }
        });
    }

    ValidarCamposComunes(inputs){
        const valores = Object.values(inputs);

        try{
            this.ValidaID(inputs.id.value) 
            this.ValidarString(inputs.nombre.value)  
            this.ValidarString(inputs.apellido.value) 
            this.ValidarFecha(inputs.fechaNacimiento.value)
        }
        catch (e){
            throw e;
        }

    }
    ValidarString(string){
        if(string !== null && string !== '') return true;
        else throw Error("Error al validar string");
    }
    ValidarNumMayorA(num, min){
        if(!isNaN(num) && parseInt(num) > min){
            return true;
        }
        throw Error("Error al validar numero");
    }
    ValidaID(id){
        if(this.ValidarNumMayorA(id, 0) && id != 666){
            return true;
        }
        else throw Error("Error al validar ID");
    }
    ValidarFecha(fecha){
        // Verifica que la fecha tenga la longitud correcta
        if (fecha.length !== 8) {
            throw new Error("Largo de la fecha no es 8");
        }

        // Verifica que cada digito sea un numero
        for (let i = 0; i < fecha.length; i++) {
            if (!Number.isInteger(fecha[i])) {
                // throw new Error("No es un numero valido");
            }
        }
        // Verifica que el año sea un numero valido
        const anio = fecha.substring(0, 4);
        console.log(anio);
        if (!this.ValidarNumMayorA(anio, 1900)) {
            throw new Error("Anioo no valido");
        }

        // Verifica que el mes sea un numero valido
        const mes = fecha.substring(4, 6);
        if (!this.ValidarNumMayorA(mes, 1) && mes <= 12) {
            throw new Error("Mes no valido");
        }

        // Verifica que el día sea un número válido
        const dia = fecha.substring(6, 8);
        if (!this.ValidarNumMayorA(dia, 1) && mes <= 31) {
            throw new Error("Dia no valido");
        }
    }
    generarNuevoID(registros) {
        // Inicializar el nuevo ID
        let nuevoID = 0;
    
        // Generar un nuevo ID hasta que sea unicoo en el array de registros
        do {
            nuevoID++; 
        } while (this.IdExisteEnRegistros(nuevoID, registros));
    
        return nuevoID;
    }

    IdExisteEnRegistros(id, registros) {
        return registros.some(registro => registro.id === id);
    }
}
export default FormABM;