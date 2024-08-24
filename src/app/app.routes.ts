import { Routes } from '@angular/router';   
import { BodyComponent } from './components/main-page/body/body.component';
import { EsepcialidadesPageComponent } from './components/esepcialidades-page/esepcialidades-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

export const routes: Routes = [
    {path: '', component:AdminPageComponent}
];
