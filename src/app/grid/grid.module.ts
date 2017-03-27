import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { ColunaHtmlDirective } from './coluna/coluna-html.directive';
import { ColunaTemplateComponent } from './coluna/coluna-template.directive';
import { ColunaTextDirective } from './coluna/coluna-text.directive';
import { ColunaSelectDirective } from './coluna/coluna-select.directive';
import { ColunaDateDirective } from './coluna/coluna-date.directive';
import { ColunaNumeroDirective } from './coluna/coluna-numero.directive';
import { ColunaComboboxComponent } from './coluna/coluna-combobox.component';
import { ColunasTemplateDirective } from './coluna/colunas-template.directive';

import { AcaoComandoDirective } from './acao/acao-comando.directive';
import { AcoesTemplateDirective } from './acao/acoes-template.directive';

import { FiltroPropriedadeDirective } from './filtro/filtro-propriedade.directive';
import { FiltrosTemplateDirective } from './filtro/filtros-template.directive';
import { GridViewListComponent } from './grid-view-list/grid-view-list.component';
import { PaginacaoComponent } from './paginacao/paginacao.component';
import { TdTemplate } from './coluna/td-template.component';
import { TemplateBuilder } from './coluna/template.builder';



import { ColunaTipo, IGridColunaSelect, IGridColunaText, IRegistroGridEdit } from './coluna/interfaces';
import { FiltroGrid, GridResultado, EventoAcao } from './modelos';

import { Select2Module } from "app/select2/select2.module";
import { PipesModule } from "app/pipes/pipes.module";
import { DiretivasModule } from "app/diretivas/diretivas.module";

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, Select2Module, PipesModule, DiretivasModule],
    exports: [
        // tags coluna
        ColunaHtmlDirective, ColunaTextDirective, ColunaSelectDirective, ColunaDateDirective, ColunaNumeroDirective, ColunaComboboxComponent, ColunasTemplateDirective,
        ColunaTemplateComponent, TdTemplate,
        // tags
        FiltrosTemplateDirective, FiltroPropriedadeDirective,
        // tags ação
        AcaoComandoDirective, AcoesTemplateDirective,
        // tags grid
        GridViewListComponent,
        // componentes complementares
        PaginacaoComponent
    ],
    declarations: [
        ColunaHtmlDirective, ColunaTemplateComponent, TdTemplate,
        ColunaTextDirective, ColunaSelectDirective, ColunaDateDirective, ColunaNumeroDirective, ColunaComboboxComponent, ColunasTemplateDirective,
        FiltrosTemplateDirective, FiltroPropriedadeDirective,
        AcaoComandoDirective, AcoesTemplateDirective,
        GridViewListComponent,
        PaginacaoComponent
    ],
    providers: [
        TemplateBuilder
    ],
})
export class GridModule { }
