export class Paciente {
    _id?: string;
    dni: number;
    nombre: String;
    telefono: String;
    passw: String;
    strikes:number;
    constructor(dni:number,telefono:String,nombre:String,passw:String,strikes:number){
        this.dni=dni;
        this.telefono=telefono; 
        this.nombre=nombre;
        this.passw=passw;
        this.strikes=strikes;
    }
    
}
