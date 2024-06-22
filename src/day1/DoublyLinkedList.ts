type Node<T> = {
    value: T,
    prev?: Node<T>,
    next?: Node<T>,
}

export default class DoublyLinkedList<T> {
    private head?: Node<T>;
    private tail?: Node<T>;
    public length: number;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        const node: Node<T> = { value: item };
        this.length++;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    append(item: T): void {
        const node: Node<T> = { value: item };
        this.length++;
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length || idx < 0) {
            throw new Error("Out of Bounds Insertion");
        } else if (idx === 0) {
            this.prepend(item);
            return;
        } else if (idx === this.length) {
            this.append(item);
            return;
        }

        let curr = this.head;
        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next;
        }

        if (curr) {
            const node: Node<T> = { value: item, prev: curr.prev, next: curr };
            if (curr.prev) {
                curr.prev.next = node;
            } else {
                this.head = node;
            }
            curr.prev = node;
            this.length++;
        }
    }

    remove(item: T): T | undefined {
        if (!this.head) {
            return undefined;
        }

        let curr: Node<T> | undefined = this.head;
        while (curr && curr.value !== item) {
            curr = curr.next;
        }
        if (!curr) {
            return undefined;
        }
        return this.removeNode(curr);
    }

    private removeNode(node: Node<T>): T | undefined {
        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }
        this.length--;
        return node.value;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }
        let curr = this.head;
        for (let i = 0; i < idx; i++) {
            curr = curr?.next;
        }
        return curr?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }
        let curr = this.head;
        for (let i = 0; i < idx; i++) {
            curr = curr?.next;
        }
        if (!curr) {
            return undefined;
        }
        return this.removeNode(curr);
    }
}
