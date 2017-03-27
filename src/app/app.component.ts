import { Component } from '@angular/core';
import { GridResultado, FiltroGrid, EventoAcao } from "app/grid/modelos";
import * as $ from 'jquery';
import * as _ from 'lodash';
import { AppService } from "app/app.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	title = 'Gridview!';
	registros: any;
	// registros: GridResultado = {
	// 	Resultado: [
	// 		{ Id: 1, Nome: "Alexandre", Nascimento: "1901-01-01" },
	// 		{ Id: 2, Nome: "Elyfrango", Nascimento: "1901-01-01" },
	// 		{ Id: 3, Nome: "Richard", Nascimento: "1901-01-01" },
	// 		{ Id: 4, Nome: "Alberto", Nascimento: "1901-01-01" },
	// 		{ Id: 5, Nome: "Ygor", Nascimento: "1901-01-01" },
	// 		{ Id: 6, Nome: "Fernando", Nascimento: "1901-01-01" },
	// 		{ Id: 7, Nome: "Daniel", Nascimento: "1901-01-01" },
	// 		{ Id: 8, Nome: "Luiz", Nascimento: "1901-01-01" },
	// 		{ Id: 9, Nome: "Barbiere", Nascimento: "1901-01-01" },
	// 		{ Id: 10, Nome: "Victor", Nascimento: "1901-01-01" },
	// 	], Total: 10
	// };

	constructor(private _service: AppService) {

	}

	carregaPagina($event: FiltroGrid) {
		this._service.getGrid($event).subscribe(
			itens => {
				this.registros = itens;
			},
			erro => {
				alert(erro);
			});
	}

    executaAcao(eventoAcao: EventoAcao) {
        switch (eventoAcao.nome) {
            case 'editar':
                //this._router.navigate(['limitefinanceiro/reuniao', modelo.Id]);
				alert('Editar');
                break;
            default:
                break;
        }
    }
}
