export default class RingBuffer<T> {
    public length: number;
    private arr: Array<T>;
    private head: number;
    private tail: number;

    constructor(capacity: number = 5) {
        this.length = 0;
        this.arr = new Array<T>(capacity);
        this.head = this.tail = 0;
    }

    private expand(): void {
        let newSize = this.arr.length * 2;
        let newArr = new Array<T>(newSize);

        for (let i = 0; i < this.length; i++) {
            newArr[i] = this.arr[(this.head + i) % this.arr.length];
        }
        this.arr = newArr;
        this.head = 0;
        this.tail = this.length;
    }

    push(item: T): void {
        if (this.length === this.arr.length) {
            this.expand();
        }
        this.arr[this.tail % this.arr.length] = item;
        this.tail = (this.tail + 1) % this.arr.length;
        this.length++;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) { return undefined; }

        return this.arr[(this.head + idx) % this.arr.length];
    }

    pop(): T | undefined {
        if (this.length === 0) { return undefined; }

        const value = this.arr[this.head % this.arr.length];
        this.head = (this.head + 1) % this.arr.length;
        this.length--;

        return value;
    }
}
