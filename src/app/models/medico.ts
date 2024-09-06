import { Especialidad } from "./especialidad";


export class Medico {
    _id?: string;
    legajo: number;
    nombre: String;
    apellido: String;
    especialidades:Array<Especialidad>;
    constructor(legajo:number,nombre:String,apellido:String,especialidades:Array<Especialidad>){
        this.legajo=legajo;
        this.nombre=nombre;
        this.apellido=apellido;
        this.especialidades=especialidades;
        
    }
}
