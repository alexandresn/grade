import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { FiltroGrid } from "app/grid/modelos";


@Injectable()
export class AppService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private _http: Http) {

    }

    getGrid(filtroGrid: FiltroGrid) {
        return this._http
            .post('http://localhost/sps/Siap/MappPedidoReuniao/GetGridData', JSON.stringify(filtroGrid), { headers: this.headers })
            //.catch((res: Response) => ErrorMessage.throwError(res));
            .map(res => res.json());
    }
}