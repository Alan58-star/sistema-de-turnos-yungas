export class Paciente {
    _id?: string;
    dni: number;
    telefono: String;
    nombre: String;
    passw: String;
    constructor(dni:number,telefono:String,nombre:String,passw:String){
        this.dni=dni;
        this.telefono=telefono; 
        this.nombre=nombre;
        this.passw=passw;
        
    }
}
