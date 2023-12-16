import  Persona  from "./Persona.js";

class Extranjero extends Persona {
    constructor(id, nombre, apellido, fechaNacimiento, paisOrigen)
    {
        super(id, nombre, apellido, fechaNacimiento);
        this.paisOrigen = paisOrigen;
    }

    getToString() {
        return `${super.getToString()} - ${this.paisOrigen}`;
    }
}
export default Extranjero;