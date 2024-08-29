import { Routes } from '@angular/router';   
import { BodyComponent } from './components/main-page/body/body.component';
import { EsepcialidadesPageComponent } from './components/esepcialidades-page/esepcialidades-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { MedicosListComponent } from './components/admin-page/medicos-list/medicos-list.component';
import { MedicoFormComponent } from './components/admin-page/medico-form/medico-form.component';
import { UsuariosListComponent } from './components/admin-page/usuarios-list/usuarios-list.component';
import { LoginComponent } from './components/login/login.component';
import { RecoverPasswordComponent } from './components/login/recover-password/recover-password.component';
import { SecretariaPageComponent } from './components/secretaria-page/secretaria-page.component';

export const routes: Routes = [
    {path: '', component:BodyComponent},
    {path: 'admin', component:AdminPageComponent},
    {path: 'especialidades', component:EsepcialidadesPageComponent},
    {path: 'medico-list', component:MedicosListComponent},
    {path: 'medico-form', component:MedicoFormComponent},
    {path: 'usuario-list', component:UsuariosListComponent},
    {path: 'login', component:LoginComponent},
    {path: 'recover-password', component:RecoverPasswordComponent},
    {path: 'secretaria', component:SecretariaPageComponent},
];
