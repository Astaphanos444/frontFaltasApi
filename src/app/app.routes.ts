import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MateriasComponent } from './materias/materias.component';
import { FaltasComponent } from './faltas/faltas.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'materias', component: MateriasComponent },
    { path: 'faltas', component: FaltasComponent }
];
