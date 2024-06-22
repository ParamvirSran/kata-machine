export default function pre_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}

function walk(root: BinaryNode<number> | null, path: number[]): number[] {
    if (!root) {
        return path;
    }
    walk(root.left, path);
    walk(root.right, path);
    path.push(root.value);
    return path;
}
