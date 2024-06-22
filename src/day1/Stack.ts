class Node<T> {
    value: T;
    next: Node<T> | undefined;

    constructor(value: T) {
        this.value = value;
        this.next = undefined;
    }
}

export default class Stack<T> {
    public length: number;
    private top: Node<T> | undefined;

    constructor() {
        this.length = 0;
        this.top = undefined;
    }

    push(item: T): void {
        const newNode = new Node(item);
        newNode.next = this.top;
        this.top = newNode;
        this.length++;
    }

    pop(): T | undefined {
        if (this.top === undefined) {
            return undefined;
        }
        const value = this.top.value;
        this.top = this.top.next;
        this.length--;
        return value;
    }

    peek(): T | undefined {
        return this.top?.value;
    }
}
