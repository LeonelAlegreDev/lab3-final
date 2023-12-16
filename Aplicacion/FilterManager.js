class FilterManager{
    constructor(filterIds, tabla, filtrar_por, promedio_txtbox, promedio_btn) {
        this.filters = [];
        this.tabla = tabla;
        this.filtrarPor = document.getElementById(filtrar_por);
        this.checkeds = [];
        this.promedio_txtbox = document.getElementById(promedio_txtbox);
        this.promedio_btn = document.getElementById(promedio_btn);
        this.init(filterIds);
    }
    
    init(filterIds) {
        // Recorremos el array de filtros
        for (const id of filterIds) {
            // Obtenemos el checkbox con el id dado
            const checkbox = document.getElementById(id);
    
            this.checkeds.push(id.replace('_filter', ''));

            // Agregamos un evento de cambio al checkbox
            checkbox.addEventListener('change', (event) => {
                this.onCheckboxChange(event.target);
            });
            this.filters.push(checkbox);
        }

        this.filtrarPor.addEventListener("change", () => {
            this.tabla.DisplayTabla(this.checkeds, this.filtrarPor.value);
        });

        this.promedio_btn.addEventListener("click", () =>{
            let total = 0;
            this.tabla.registrosFiltrados.forEach(registro => {
                total = registro.edad + total;
            });

            const promedio = total / this.tabla.registrosFiltrados.length;

            this.promedio_txtbox.value = promedio;
        })
    }
    
    // Evento de cambio
    onCheckboxChange(checkbox) {
        const id = checkbox.id;
        const checked = checkbox.checked;
    
        const nombreCampo = id.replace('_filter', '');

        // Agrega el nombre del campo al array de filtros seleccionados
        if (checked) {
            this.checkeds.push(nombreCampo);
        } else {
            // Elimina el nombre del campo del array de filtros seleccionados
            this.checkeds.splice(this.checkeds.indexOf(nombreCampo), 1);
        }

        this.tabla.DisplayTabla(this.checkeds, this.filtrarPor.value);
    }
}
export default FilterManager;