import Ciudadano from "../Logica/Ciudadano.js";
import Cliente from "../Logica/Cliente.js";
import Empleado from "../Logica/Empleado.js";
import Extranjero from "../Logica/Extranjero.js";

class Tabla{
    constructor(id, registros){
        this.tabla = document.getElementById(id);
        this.encabezados = registros.reduce((encabezados, registro) => {
            for (const atributo of Object.keys(registro)) {
                if (!encabezados.includes(atributo)) {
                    encabezados.push(atributo);
                }
            }
            return encabezados;
        }, []);
        this.registros = registros;
        this.registrosFiltrados = [];

    }

    DisplayTabla(filtros, tipo) {
        // Limpia los datos de la tabla
        this.tabla.innerHTML = "";

        // Crea el encabezado de la tabla
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");

        if (tipo === "Todos") {
            // Si tipo es "Todos", devolver todos los registros sin filtrar
            this.registrosFiltrados = this.registros;
        } else {
            // Filtrar registros según la instancia de la clase deseada
            this.registrosFiltrados = this.registros.filter(registro => {
                if (tipo === "Ciudadano") {
                    return registro instanceof Ciudadano;
                } else if (tipo === "Extranjero") {
                    return registro instanceof Extranjero;
                }
            });
        }
        
        this.encabezados.forEach((encabezado) => {
            let skip = true;

            for(let i = 0; i < filtros.length; i++){
                // Si el filtro es igual al encabezado no saltar
                if(filtros[i] == encabezado){
                    skip = false;
                }
            }
            if(!skip){
                const th = document.createElement("th");
                th.textContent = encabezado;
                tr.appendChild(th);
            }
        });
        thead.appendChild(tr);
    
        // Crea el cuerpo de la tabla
        const tbody = document.createElement("tbody");
        this.registrosFiltrados.forEach((registro) =>{
            const tr = document.createElement("tr");
            tr.setAttribute("data-id", registro.id);

            this.encabezados.forEach(encabezado => {
                let skip = true;

                for(let i = 0; i < filtros.length; i++){
                    // Si el filtro es igual al encabezado no saltar
                    if(filtros[i] == encabezado){
                        skip = false;
                    }
                }
                if(!skip){
                    const td = document.createElement("td");
                    const tienePropiedad = encabezado in registro;
                    if (tienePropiedad) {
                        const valor = registro[encabezado];
                        td.textContent = valor;
                    } else {
                        td.textContent = '-';
                    }
                    tr.appendChild(td);
                }
            });
            tbody.appendChild(tr);
        });
    
        // Agrega el encabezado y el cuerpo a la tabla
        this.tabla.appendChild(thead);
        this.tabla.appendChild(tbody);
    }
}
export default Tabla;