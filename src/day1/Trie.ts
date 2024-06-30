type Node = {
    value: string;
    children: Map<string, Node>;
    isWord: boolean;
}

export default class Trie {
    private root: Node;

    constructor() {
        this.root = { value: "", children: new Map(), isWord: false };
    }

    insert(item: string): void {
        let curr = this.root;

        for (const char of item) {
            if (!curr.children.has(char)) {
                curr.children.set(char, { value: char, children: new Map(), isWord: false });
            }
            curr = curr.children.get(char)!;
        }
        curr.isWord = true;
    }

    delete(item: string): void {
        const stack: Array<{ node: Node, char: string }> = [];
        let curr = this.root;

        for (const char of item) {
            if (!curr.children.has(char)) {
                return;
            }
            stack.push({ node: curr, char });
            curr = curr.children.get(char)!;
        }
        if (!curr.isWord) {
            return;
        }
        curr.isWord = false;

        while (stack.length > 0) {
            const { node, char } = stack.pop()!;
            const child = node.children.get(char)!;

            if (child.children.size === 0 && !child.isWord) {
                node.children.delete(char);
            } else {
                break;
            }
        }
    }

    find(partial: string): string[] {
        const results: string[] = [];
        let curr = this.root;

        for (const char of partial) {
            if (!curr.children.has(char)) {
                return results;
            }
            curr = curr.children.get(char)!;
        }
        this.dfs_words(curr, partial, results);
        return results;
    }

    dfs_words(curr: Node, partial: string, results: string[]): void {
        if (curr.isWord) {
            results.push(partial);
        }
        for (const [char, child] of curr.children) {
            this.dfs_words(child, partial + char, results);
        }
    }
}
