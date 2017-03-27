import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
    selector: '[highlight-class]'
})
export class HighlightClassDirective {
    private _defaultClass = 'active';
    private _hightlightClassOnSelect = 'active';

    constructor(private el: ElementRef, private renderer: Renderer) { }

    @Input() set defaultClass(className: string) {
        this._defaultClass = className || this._defaultClass;
    }

    get defaultClass() {
        return this.highlightClass || this._defaultClass
    }

    @Input() set hightlightClassOnSelect(className: string) {
        this._hightlightClassOnSelect = className || this._hightlightClassOnSelect;
    }

    @Input('highlight-class') highlightClass: string;

    @HostListener('click') onClick() {
        this.selected();
    }

    @HostListener('mouseover') onMouseEnter() {
        this.highlight(this.defaultClass, true);
    }

    @HostListener('mouseout') onMouseLeave() {
        this.highlight(this.defaultClass, false);
    }

    private highlight(className: string, hover: boolean) {
        if (hover)
            this.renderer.setElementClass(this.el.nativeElement, className, hover);
        else
            this.renderer.setElementClass(this.el.nativeElement, className, hover);
    }

    private selected() {
        if (!this.el.nativeElement.classList.contains('st-selected'))
            this.renderer.setElementClass(this.el.nativeElement, "st-selected", true);
        else
            this.renderer.setElementClass(this.el.nativeElement, "st-selected", false);
    }
}

