export class FilterOption {
    column: string
    value: string | number

    constructor(column: string, value: string | number) {
        this.column = column;
        this.value = value;
    }
}