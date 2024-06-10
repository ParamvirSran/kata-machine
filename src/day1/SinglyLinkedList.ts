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
        if (this.length == 0) {
            this.head = this.tail = newNode;
        }
        newNode.next = this.head;
        this.head = newNode;
    }

    insertAt(item: T, idx: number): void {
        const newNode = new Node(item);
        if (this.length == 0) {
            this.head = this.tail = newNode;
        }
        let curr = this.head;
        while (curr.next != null) {
            curr = curr.next;
        }
    }
    append(item: T): void {

    }
    remove(item: T): T | undefined {

    }
    get(idx: number): T | undefined {

    }
    removeAt(idx: number): T | undefined {

    }
}
