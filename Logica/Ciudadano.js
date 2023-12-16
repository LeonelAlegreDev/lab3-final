import  Persona  from "./Persona.js";

class Ciudadano extends Persona {
    constructor(id, nombre, apellido, fechaNacimiento, dni)
    {
        super(id, nombre, apellido, fechaNacimiento);
        this.dni = dni;
    }

    getToString() {
        return `${super.getToString()} - ${this.dni}`;
    }
}
export default Ciudadano;