import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Deputado, Deputados, Eventos } from 'src/app/models/deputy-model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: number = 0;
  deputado?: Deputado;
  eventos: Eventos[] = [];
  ultimoEvento?: Eventos;
  proxEvento?: Eventos;

  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.getById(this.id);      
      this.getEvents(this.id);   
    });
    
  }

  getById(id: number) {
    this.httpService.getDeputyById(id).subscribe(
      (data: any) => {        
        this.deputado = data.dados;         
      }
    )
  }

  getEvents(id: number) {
    this.httpService.getDeputyEvents(id).subscribe(
      (data:any) => {
        console.log(data);
        this.eventos = data.dados;
        this.getLastEvent(data.dados);
        this.getNextEvent(data.dados);             
      }
    )
  }

  getLastEvent(evento: Eventos[])
  {
    this.ultimoEvento = evento[0];   
    

    for(let i = 0; i < evento.length; i++)
    {
      if(evento[i].situacao === 'Em Andamento')
      {
        this.ultimoEvento = evento[i];
        
        
        return;
      }
      if(evento[i].dataHoraFim > this.ultimoEvento.dataHoraFim)
      {        
        this.ultimoEvento = evento[i];        
      }
    }
  }

  getNextEvent(evento: Eventos[])
  {
    const proxEvents = evento.filter(x => {

      return (x.situacao !== "Em Andamento" && x.situacao !== "Encerrada" && x.situacao !== "Cancelada" && x.situacao !== "Encerrada (Final)" && x.situacao !== "Não Confirmada")
    });

    this.proxEvento = proxEvents[0];

    for(let i = 0; i < proxEvents.length; i++)
    {
      if(proxEvents[i].dataHoraInicio < this.proxEvento.dataHoraInicio)
      {
        this.proxEvento = proxEvents[i];
      }
    }
  }
}
