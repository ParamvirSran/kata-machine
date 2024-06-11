class Node<T> {
    value: T;
    next: Node<T> | undefined;

    constructor(value: T) {
        this.value = value;
        this.next = undefined;
    }
}

export default class SinglyLinkedList<T> {
    public length: number;
    private head: Node<T> | undefined;
    private tail: Node<T> | undefined;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        const newNode = new Node(item);
        if (this.length === 0) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) { throw new Error("Index out of bounds"); }

        if (idx === 0) { this.prepend(item); return; }

        const newNode = new Node(item);
        let curr = this.head;

        for (let i = 0; i < idx; i++) {
            if (curr) {
                curr = curr.next;
            }
        }

        if (curr) {
            newNode.next = curr.next;
            curr.next = newNode;
        }
        if (newNode.next === undefined) {
            this.tail = newNode;
        }
        this.length++;
    }

    append(item: T): void {
        const newNode = new Node(item);

        if (this.length === 0) {
            this.head = this.tail = newNode;
        } else if (this.tail) {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    remove(item: T): T | undefined {
        let curr = this.head;
        let prev = undefined;

        while (curr) {
            if (curr.value === item) {
                if (prev) {
                    prev.next = curr.next;
                } else {
                    this.head = curr.next;
                }
                if (curr.next === undefined) {
                    this.tail = prev;
                }
                this.length--;
                return curr.value;
            }
            prev = curr;
            curr = curr.next;
        }
        return undefined;
    }
    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) { return undefined; }
        let curr = this.head;
        for (let i = 0; i < idx; i++) {
            if (curr) {
                curr = curr.next;
            }
        }
        return curr?.value;
    }
    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) { return undefined; }
        if (idx === 0) {
            const value = this.head?.value;
            this.head = this.head?.next;
            if (this.length === 1) {
                this.tail = undefined;
            }
            this.length--;
            return value;
        }
        let curr = this.head;
        for (let i = 0; i < idx - 1; i++) {
            if (curr) {
                curr = curr.next;
            }
        }
        if (curr && curr.next) {
            const value = curr.next.value;
            curr.next = curr.next.next;
            if (curr.next === undefined) {
                this.tail = curr;
            }
            this.length--;
            return value;
        }
        return undefined;
    }
}
