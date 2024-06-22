export default class ArrayList<T> {
    public length: number;
    private arr: Array<T>;

    constructor(capacity: number = 10) {
        this.length = 0;
        this.arr = new Array<T>(capacity);
    }

    prepend(item: T): void {
        if (this.arr.length <= this.length) {
            this.expand();
        }
        for (let i = this.length; i > 0; i--) {
            this.arr[i] = this.arr[i - 1];
        }
        this.arr[0] = item;
        this.length++;
    }

    expand(): void {
        let temp = this.arr;
        this.arr = new Array<T>(this.arr.length * 2);
        for (let i = 0; i < this.length; i++) {
            this.arr[i] = temp[i];
        }
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) { return; }
        if (idx === 0) { this.prepend(item); return; }

        if (this.arr.length <= this.length) {
            this.expand();
        }
        for (let i = this.length; i > idx; i--) {
            this.arr[i] = this.arr[i - 1];
        }
        this.arr[idx] = item;
        this.length++;
    }

    append(item: T): void {
        if (this.arr.length <= this.length) {
            this.expand();
        }
        this.arr[this.length] = item;
        this.length++;
    }

    remove(item: T): T | undefined {
        if (this.length === 0) { return undefined; }

        for (let i = 0; i < this.length; i++) {
            if (item === this.arr[i]) {
                return this.removeAt(i);
            }
        }
        return undefined;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) { return undefined; }
        return this.arr[idx];
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) { return undefined; }
        const value = this.arr[idx];

        for (let i = idx; i < this.length - 1; i++) {
            this.arr[i] = this.arr[i + 1];
        }
        this.length--;
        return value;
    }
}
