import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Deputados } from 'src/app/models/deputy-model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchForm = this.formBuilder.group({
    nome: '',
    sexo: '',
    siglaUf: '',
    siglaPartido: '',
  });

  partidos: string[] = [
    "",
    "AVANTE",
    "CIDADANIA",
    "DEM",
    "MDB",
    "NOVO",
    "PATRIOTA",
    "PCdoB",
    "PDT",
    "PL",
    "PODE",
    "PP",
    "PROS",
    "PSB",
    "PSC",
    "PSD",
    "PSDB",
    "PSL",
    "PSOL",
    "PT",
    "PTB",
    "PV",
    "REDE",
    "REPUBLICANOS",
    "SOLIDARIEDADE",
]


  constructor(private httpService: HttpService, private formBuilder: FormBuilder) { }

  deputados: Deputados[] = [];

  ngOnInit(): void {
    this.getDeputy();
  }

  onSubmit() {
       this.httpService.resetPage();
       this.getDeputy();
  }

  getDeputy() {
    this.httpService.getDeputy(this.searchForm.value.nome, this.searchForm.value.siglaPartido, this.searchForm.value.siglaUf, this.searchForm.value.sexo).subscribe(
      (data: any) => {
        console.log(data);
        this.deputados = data.dados;      
        this.httpService.setDeputados(this.deputados);  
      }
    ); 
  }

}
