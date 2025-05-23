import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router, RouterLink } from '@angular/router';

type Faltas = {
    id: number,
    dataFalta: string
}

@Component({
  selector: 'app-faltas',
  imports: [RouterLink],
  templateUrl: './faltas.component.html',
  styleUrl: './faltas.component.scss'
})
export class FaltasComponent implements OnInit {
  constructor(private request : HttpService, private router : Router){}

  faltas : Faltas[] = [];
  materiaNome = "";
  totalFaltas = 0;

  ngOnInit(): void {
    this.populingFaltas();
    this.materiaNome = this.request.getMateriaNome();
  }

  populingFaltas(){
    this.faltas = [];
    this.request.getFaltas().subscribe({
      next: (data: any) => {
        if(data){
          for(let f of data){
            this.faltas.push(f);
          }
        }
      },
      error: (err: any) => {
        console.log('error');
      }
    });
  }
  
  formatarDataCompleta(dataStr: string): string {
    const corrigida = dataStr.replace(/(\.\d{3})\d+/, '$1');
    const data = new Date(corrigida);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  countFaltas(){
    this.totalFaltas = this.faltas.length;
    return this.totalFaltas;
  }

  postNewFalta(){
    this.request.postNewFalta().subscribe({
      next: (data: any) => {
        this.populingFaltas();
      },
      error: (err: any) => {
        console.log('error');
      }
    });
  }

  deleteFalta(faltaId: any){
    this.request.deleteFalta(faltaId).subscribe({
      next: (data: any) => {
        this.populingFaltas();
      },
      error: (err: any) => {
        console.log('error');
      }
    });
  }
}
