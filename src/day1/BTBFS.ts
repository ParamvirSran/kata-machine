export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    return walk(head, needle);
}

function walk(root: BinaryNode<number> | null, needle: number): boolean {
    if (!root) {
        return false;
    } else if (root.value === needle) {
        return true;
    } else if (walk(root.left, needle)) {
        return true;
    } else if (walk(root.right, needle)) {
        return true;
    } else {
        return false;
    }
}
