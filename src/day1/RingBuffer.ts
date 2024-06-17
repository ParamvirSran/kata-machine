export default class RingBuffer<T> {
    public length: number;
    private arr: Array<T>;
    private head: number;
    private tail: number;

    constructor() {
        this.length = 0;
        this.arr = new Array<T>(5);
        this.head = this.tail = 0;
    }

    push(item: T): void {
        if ((this.head % this.arr.length) === (this.tail % this.arr.length)) {
            let temp = new Array<T>(this.arr.length * 2);
            for (let i = 0; i < this.length; i++) {
                temp[i] = this.arr[(this.head + i) % this.arr.length];
            }
            this.arr = temp;
        }
        this.arr[this.tail % this.arr.length] = item;
        this.length++;
        this.tail++;
    }
    get(idx: number): T | undefined {
        const value = this.arr[(this.head + idx) % this.arr.length];
        return value;
    }
    pop(): T | undefined {
        if (this.length === 0) { return undefined; }
        const value = this.arr[(this.head) % this.arr.length];
        this.length--;
        this.head++;
        return value;
    }
}
