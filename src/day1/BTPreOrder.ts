export default function pre_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}

function walk(root: BinaryNode<number> | null, path: number[]): number[] {
    if (!root) {
        return path;
    }
    path.push(root.value);
    walk(root.left, path);
    walk(root.right, path);
    return path;
}
