import { GridCampoFormato, GridCampo } from '../modelos';
import { ColunaTipo, IGridColunaSelect, IGridColuna } from '../coluna/interfaces';

export class GridTemplateBase {
    private formatadorNumeroPtBr = Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 });
    private formatadorDataPtBr = Intl.DateTimeFormat('pt-BR');
    private formatadorDataHoraPtBr = Intl.DateTimeFormat('pt-BR', {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: false
    });

    constructor() { }

    byString(o: any, coluna: IGridColuna) {
        var a = [];
        let s = coluna.campo;

        if (s) {
            s = s.replace(/\[(\w+)\]/g, '.$1');
            s = s.replace(/^\./, '');
            a = s.split('.');
        }
        try {
            for (var i = 0, n = a.length; i < n; ++i) {
                var k = a[i];
                if ((k && o) && k in o) {
                    o = o[k];
                } else {
                    return;
                }
            }

            if (o != undefined) {
                switch (coluna.tipo) {
                    case ColunaTipo.NUMERO:
                        o = this.formatadorNumeroPtBr.format(o);
                        break;
                    case ColunaTipo.DATA:
                        o = this.formatadorDataPtBr.format(new Date(o));
                        break;
                    case ColunaTipo.DATAHORA:
                        o = this.formatadorDataHoraPtBr.format(new Date(o));
                        break;

                    default:
                        break;
                }
            }
            return o;

        } catch (error) {
            console.error('byString:Erro em conversão: ' + error);
            return;
        }
    }

    verificarCondicao(registro: any, acao: any) {
        var valorPropriedade = registro;
        var a = [];
        if (acao && acao.condicaoPropriedade) {
            let s = acao.condicaoPropriedade;
            s = s.replace(/\[(\w+)\]/g, '.$1');
            s = s.replace(/^\./, '');
            a = s.split('.');
        }

        try {
            for (var i = 0, n = a.length; i < n; ++i) {
                var k = a[i];
                if (k in valorPropriedade) {
                    valorPropriedade = valorPropriedade[k];
                } else {
                    return acao.template && (acao.condicaoPropriedade == undefined || (acao.condicaoPropriedade && valorPropriedade == acao.condicaoValor));
                }
            }

            return (acao.condicaoPropriedade == undefined || (acao.condicaoPropriedade && valorPropriedade == acao.condicaoValor));
        } catch (error) {
            return;
        }
    }

    /**
    * Converte valor para booleano
    */
    booleanConvert(valor: any): boolean {
        if (valor === null || valor === undefined || typeof valor === "boolean")
            return valor;

        return valor.toString() === "true";
    }


    /**
     * Método responsável por separar a renderização das ações abseando-se na quantidade destas.
     * Ex.: Se existir apenas uma ação para ser exibita, esta não será mais renderizada em formado drop e sim como botão.
     *
     * @param {*} registro
     * @param {Array<any>} acoes
     * @returns
     */
    verificarExistenciaDeMaisDeUmaAcaoVerdade(registro: any, acoes: Array<any>) {
        //contador de ações true
        let contador = 0;
        //valor retorno para exibição de permissões
        let valor: boolean = false;

        for (var i = 0; i <= acoes.length; i++) {
            //se não existir ações
            if (acoes[i] == null)
                continue;

            //Recupera o nome da propriedade que será pesquisado no registro o conteudo da permissão
            let nomePropriedadeAcao = this.verificarExistenciaDeValores(acoes, i, 0);
            //valor da propriedade da persmissão
            let valorDaPropriedadeAcao = this.verificarExistenciaDeValores(acoes, i, 1);

            //Se não existir nenhum valor informado para a propriedade e valor
            if (!nomePropriedadeAcao || !valorDaPropriedadeAcao)
                continue;

            //Verifica se a permissão recuperada tem permissão sobre o registro
            if (registro[nomePropriedadeAcao][valorDaPropriedadeAcao]) {
                contador++;
            }

            //Se houver mais de uma permissão para o registro
            if (contador > 1) {
                //alerta que existe permissao ativa
                valor = true;
                //para o for
                break;
            }
        }
        //retorna o valor de exibição
        return valor;
    }


    /**
     * Método responsável por garantir a captura da propriedade e valor a serem verificados nas permissões
     *
     * @param {Array<any>} acoes
     * @param {number} posicaoRegistro
     * @param {number} posicaoArray
     * @returns
     *
     * @memberOf GridTemplateBase
     */
    verificarExistenciaDeValores(acoes: Array<any>, posicaoRegistro: number, posicaoArray: number) {
        return (acoes.length > 0 && acoes[posicaoRegistro] != null && acoes[posicaoRegistro].condicaoPropriedade != null) ? acoes[posicaoRegistro].condicaoPropriedade.split('.')[posicaoArray] : null;
    }
}
