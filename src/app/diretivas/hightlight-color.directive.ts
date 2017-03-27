import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
    selector: '[highlight-color]'
})
export class HighlightColorDirective {
    private _defaultColor = 'red';

    constructor(private el: ElementRef, private renderer: Renderer) { }

    @Input() set defaultColor(colorName: string) {
        this._defaultColor = colorName || this._defaultColor;
    }

    @Input('highlight-color') highlightColor: string;

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.highlightColor || this._defaultColor);
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
    }

    private highlight(color: string) {
        this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
    }
}