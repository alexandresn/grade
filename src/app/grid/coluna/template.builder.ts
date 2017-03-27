import { NgModule, Compiler, Component, Injectable, ComponentFactory } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as _ from "lodash";

// referência http://stackoverflow.com/questions/38888008/how-can-i-use-create-dynamic-template-to-compile-dynamic-component-with-angular

@Injectable()
export class TemplateBuilder {    
      // this object is singleton - so we can use this as a cache
    private _cacheOfFactories: {[templateKey: string]: ComponentFactory<any>} = {};

    constructor(private compiler: Compiler) {
    }

    createComponent(template: string, campo: string, modelo: any) {
        let factory = this._cacheOfFactories[template];

        let type = compileToComponent(template, [], campo, modelo);
        let module = createComponentModule(type);

        return new Promise((resolve) => {
            this.compiler
                .compileModuleAndAllComponentsAsync(module)
                .then((moduleWithFactories) => {
                    factory = _.find(moduleWithFactories.componentFactories, { componentType: type });

                    this._cacheOfFactories[template] = factory;

                    resolve(factory);
                });
        });
    }
}

function compileToComponent(template, directives, campo, modelo) {
    @Component({
        selector: 'runtimeComponent',
        template: template
    })
    class RuntimeComponent {
        get campo() {
            return campo;
        }

        get modelo() {
            return modelo;
        }
    };
    return RuntimeComponent;
}



function createComponentModule(componentType) {
    @NgModule({
        imports: [
            CommonModule
        ],
        declarations: [
            componentType
        ],
    })
    class RuntimeComponentModule {
    }
    // a module for just this Type
    return RuntimeComponentModule;
}
