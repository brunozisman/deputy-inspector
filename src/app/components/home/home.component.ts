import { Component, Input, OnInit } from '@angular/core';
import { Deputados } from 'src/app/models/deputy-model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  deputados: Deputados[] = [];
  page: number = 1;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    
    this.httpService.deputados.subscribe(
      (deputados) => (this.deputados = deputados)
    );
    
  }
}
