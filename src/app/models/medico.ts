

export class Medico {
    _id?: string;
    legajo: number;
    nombre: String;
    apellido: String;
    constructor(legajo:number,nombre:String,apellido:String){
        this.legajo=legajo;
        this.nombre=nombre;
        this.apellido=apellido;
        
    }
}
