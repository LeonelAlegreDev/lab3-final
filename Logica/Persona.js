class Persona {
    constructor(id, nombre, apellido, fechaNacimiento) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
    }

    getToString() {
        return `${this.id} - ${this.nombre} - ${this.apellido} - ${this.fechaNacimiento}`;
    }
}

export default Persona;