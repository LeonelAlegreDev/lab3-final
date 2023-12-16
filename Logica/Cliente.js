import  Persona  from "./Persona.js";

class Cliente extends Persona {
    constructor(id, nombre, edad, email)
    {
        super(id, nombre, edad);
        this.email = email;
    }

    getToString() {
        return `${super.getToString()} - ${this.email}`;
    }
}
export default Cliente;