import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type Materia = {
  id: Number,
  nome : String,
  maxFaltas : Number,
  userId : Number
}

@Component({
  selector: 'app-materias',
  imports: [FormsModule],
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.scss'
})
export class MateriasComponent implements OnInit {
  materias : Materia[] = [];
  newMateria : string = "";

  constructor(private request : HttpService, private router: Router) {}

  ngOnInit(): void {
    this.populingMaterias();
  }

  populingMaterias(){
    this.materias = [];
    this.request.getMaterias().subscribe({
        next: (data: any) => {
          if(data){
            for(let m of data){
              this.materias.push(m);
            }
          }
        },
        error: (err: any) => {
          console.log('error');
        }
      });
  }

  newMateriaf(){
    this.request.postMateria(this.newMateria).subscribe({
        next: (data: any) => {
          this.populingMaterias();
        },
        error: (err: any) => {
          console.log('error');
        }
      });
  }

  pagFaltasMateria(materiaId: any, materiaNome: any){
    let materiaIdf: number = materiaId;
    let materiaNomef : string = materiaNome;
    this.request.setMateriaId(materiaIdf);
    this.request.setMateriaNome(materiaNomef);
    this.router.navigate(['faltas']);
  }
}
