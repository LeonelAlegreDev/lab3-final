import App from "./App.js";
import FilterManager from "./FilterManager.js";
import FormABM from "./FormABM.js";
import Tabla from "./Tabla.js";

const app = new App();

const datos = '[{"id":1,"apellido":"Serrano","nombre":"Horacio","fechaNacimiento":19840103,"dni":45876942},{"id":2,"apellido":"Casas","nombre":"Julian","fechaNacimiento":19990723,"dni":98536214},{"id":3,"apellido":"Galeano","nombre":"Julieta","fechaNacimiento":20081103,"dni":74859612},{"id":4,"apellido":"Molina","nombre":"Juana","fechaNacimiento":19681201,"paisOrigen":"Paraguay"},{"id":5,"apellido":"Barrichello","nombre":"Rubens","fechaNacimiento":19720523,"paisOrigen":"Brazil"},{"id":666,"apellido":"Hkkinen","nombre":"Mika","fechaNacimiento":19680928,"paisOrigen":"Finlandia"}]';
app.CargarDatos(datos);

const table = new Tabla("tabla_registros", app.personas);
table.DisplayTabla(["id", "nombre", "apellido", "fechaNacimiento", "dni", "paisOrigen"], "Todos");

const filterManager = new FilterManager(["id_filter", "nombre_filter", "apellido_filter", "fechaNacimiento_filter", "dni_filter", "paisOrigen"], table, "filtrar_por", "edad_promedio", "calcular_edad_promedio");
const abm = new FormABM("abm", table);



console.log();
