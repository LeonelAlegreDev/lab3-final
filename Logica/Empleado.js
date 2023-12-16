import  Persona  from "./Persona.js";

class Empleado extends Persona {
    constructor(id, nombre, edad, sueldo)
    {
        super(id, nombre, edad);
        this.sueldo = sueldo;
    }

    getToString() {
        return `${super.getToString()} - ${this.sueldo}`;
    }
}
export default Empleado;