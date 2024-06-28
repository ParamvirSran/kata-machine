type Node<V> = {
    value: V;
    prev?: Node<V>;
    next?: Node<V>;
}

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;

    private lookup: Map<K, Node<V>>;
    private rev_lookup: Map<Node<V>, K>;

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;

        this.lookup = new Map<K, Node<V>>();
        this.rev_lookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        let node = this.lookup.get(key);

        if (!node) {
            node = { value: value } as Node<V>;
            this.prepend(node);

            this.lookup.set(key, node);
            this.rev_lookup.set(node, key);

            this.length++;
            this.trim_cache();
        } else {
            node.value = value;
            this.detach(node);
            this.prepend(node);
        }
    }

    get(key: K): V | undefined {
        const node = this.lookup.get(key);

        if (!node) {
            return undefined;
        }
        this.detach(node);
        this.prepend(node);
        return node.value;
    }

    private trim_cache(): void {
        if (this.length <= this.capacity) {
            return;
        }
        const node = this.tail as Node<V>;
        const key = this.rev_lookup.get(node) as K;

        this.lookup.delete(key);
        this.rev_lookup.delete(node);

        this.detach(node);
        this.length--;
    }

    private prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    private detach(node: Node<V>): void {
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
        if (node === this.head) {
            this.head = node.next;
        }
        if (node === this.tail) {
            this.tail = node.prev;
        }
        node.prev = undefined;
        node.next = undefined;
    }
}
