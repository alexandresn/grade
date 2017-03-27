
export class SelectItem {
    id: string;
    text: string;
    source: any;
    children: Array<SelectItem>;
    parent: SelectItem;

    constructor(value: any, text: any) {
        this.id = value;
        this.text = text;
    }
}