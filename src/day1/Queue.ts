class Node<T> {
    value: T;
    next: Node<T> | undefined;

    constructor(value: T) {
        this.value = value;
        this.next = undefined;
    }
}

export default class Queue<T> {
    public length: number;
    private front: Node<T> | undefined;
    private back: Node<T> | undefined;

    constructor() {
        this.length = 0;
        this.front = undefined;
        this.back = undefined;
    }

    enqueue(item: T): void {
        const newNode = new Node(item);
        if (this.length === 0) {
            this.front = this.back = newNode;
        } else if (this.back !== undefined) {
            this.back.next = newNode;
            this.back = newNode;
        }
        this.length++;
    }

    deque(): T | undefined {
        if (this.front === undefined) {
            return undefined;
        }

        const value = this.front.value;
        this.front = this.front.next;

        if (this.front === undefined) {
            this.back = undefined;
        }
        this.length--;
        return value;
    }

    peek(): T | undefined {
        return this.front?.value;
    }
}
