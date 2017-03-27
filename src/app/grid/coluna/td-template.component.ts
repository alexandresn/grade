import { NgModule, Component, OnInit, AfterViewInit, ComponentFactory, ElementRef, Input, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Injectable } from '@angular/core';
import { TemplateBuilder } from './template.builder';

@Component({
    selector: 'td-template',
    template: '<div #container></div>'
})
export class TdTemplate implements OnInit, AfterViewInit {
    @Input() template: string;
    @Input() campo: any;
    @Input() modelo: any;
    // this will be reference to dynamic content - to be able to destroy it
    protected componentRef: ComponentRef<any>;    
    private componentReference: ComponentRef<any>;
    @ViewChild('container', { read: ViewContainerRef }) dynamicTarget;

    constructor(private _templateBuilder:TemplateBuilder) {        
    }

    refreshContent(){
        this._templateBuilder
                    .createComponent(this.template, this.campo, this.modelo)
                    .then((factory: ComponentFactory<any>) =>
        {
            // Target will instantiate and inject component (we'll keep reference to it)
            this.componentRef = this
                .dynamicTarget
                .createComponent(factory);

            // let's inject @Inputs to component instance
            let component = this.componentRef.instance;                       
        });
    }

    ngOnInit() {                
    }

    ngAfterViewInit(){
        this.refreshContent();
    }
}