import { Especialidad } from "./especialidad";


export class Medico {
    _id?: string;
    legajo: number;
    nombre: String;
    apellido: String;
    especialidades:Array<Especialidad>;
    disponibles:number;
    constructor(legajo:number,nombre:String,apellido:String,especialidades:Array<Especialidad>,disponibles:number){
        this.legajo=legajo;
        this.nombre=nombre;
        this.apellido=apellido;
        this.especialidades=especialidades;
        this.disponibles=disponibles;
        
    }
}
