import { Router } from "@angular/router";
import {inject} from "@angular/core";
export const loginGuardAdmin=()=>{
    const router = inject(Router);
    if(sessionStorage.getItem('token') && sessionStorage.getItem('rol')=='admin'){
        return true;
    }
    else{
        router.navigate(['/']);
        return false;
    }
    
}
export const loginGuardSecretaria=()=>{
    const router = inject(Router);
    if(sessionStorage.getItem('token') && (sessionStorage.getItem('rol')=='secretaria'|| sessionStorage.getItem('rol')=='admin')){
        return true;
    }
    else{
        router.navigate(['/']);
        return false;
    }
    
}
export const loginGuardPaciente=()=>{
    const router = inject(Router);
    if(sessionStorage.getItem('token')){
        return true;
    }
    else{
        router.navigate(['/']);
        return false;
    }
    
}