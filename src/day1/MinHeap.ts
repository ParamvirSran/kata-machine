export default class MinHeap {
    public length: number;
    private arr: number[];

    constructor(capacity: number = 10) {
        this.length = 0;
        this.arr = new Array<number>(capacity);
    }

    insert(value: number): void {
        this.arr[this.length] = value;
        this.length++;
        this.heapify_up();
    }

    private heapify_up(): void {
        let curr: number = this.length - 1;
        let parent: number = Math.floor((curr - 1) / 2);
        while (parent >= 0 && this.arr[curr] < this.arr[parent]) {
            let temp = this.arr[curr];
            this.arr[curr] = this.arr[parent];
            this.arr[parent] = temp;
            curr = parent;
            parent = Math.floor((curr - 1) / 2);
        }
    }

    delete(): number {
        if (this.length === 0) {
            throw new Error("Removal from empty heap");
        }
        if (this.length === 1) {
            this.length--;
            return this.arr[0];
        }
        const temp = this.arr[0];
        this.arr[0] = this.arr[this.length - 1];
        this.length--;
        this.heapify_down();
        return temp;
    }

    private heapify_down(): void {
        let curr: number = 0;
        let child: number = 1;

        if (this.arr[1] > this.arr[2]) {
            child = 2;
        }

        while (child < this.length && this.arr[curr] > this.arr[child]) {
            let temp = this.arr[curr];
            this.arr[curr] = this.arr[child];
            this.arr[child] = temp;
            curr = child;
            child = curr * 2 + 1;

            if (this.arr[child] > this.arr[child + 1]) {
                child++;
            }
        }
    }
}
