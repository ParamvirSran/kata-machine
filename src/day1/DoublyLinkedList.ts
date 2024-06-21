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
        for (let i = 0; i < idx - 1 && curr; i++) {
            curr = curr.next;
        }

        if (curr) {
            const node: Node<T> = { value: item, prev: curr, next: curr.next };
            if (curr.next) {
                curr.next.prev = node;
            }
            curr.next = node;
            this.length++;
        }
    }

    remove(item: T): T | undefined {
        if (!this.head) {
            return undefined;
        }

        let curr = this.head;
        while (curr.next && curr.value !== item) {
            curr = curr.next;
        }
        if (!curr || curr.value !== item) {
            return undefined;
        }
        return this.removeNode(curr);
    }

    private removeNode(node: Node<T>): T | undefined {
        let prev = node.prev;
        let next = node.next;

        if (!prev && next) {
            next.prev = undefined;
            this.head = next;
        } else if (prev && !next) {
            prev.next = undefined;
            this.tail = prev;
        } else if (!prev && !next) {
            this.head = this.tail = undefined;
        } else if (prev && next) {
            prev.next = next;
            next.prev = prev;
        }
        this.length--;
        return node.value;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }
        let curr = this.head;
        for (let i = 0; i < idx && curr?.next; i++) {
            curr = curr.next;
        }
        return curr?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }
        if (!this.head) {
            return undefined;
        }
        let curr = this.head;
        for (let i = 0; i < idx; i++) {
            if (curr && curr.next) {
                curr = curr.next;
            }
        }
        if (!curr) {
            return undefined;
        }
        return this.removeNode(curr);
    }
}
