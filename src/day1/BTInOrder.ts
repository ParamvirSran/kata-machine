export default function in_order_search(head: BinaryNode<number>): number[] {
    let visited: number[] = new Array();
    walk(visited, head);
    return visited;
}

function walk(visited: number[], root: BinaryNode<number> | null): boolean {
    if (!root) {
        return false;
    }
    walk(visited, root.left);
    visited.push(root.value);
    walk(visited, root.right);
    return true;
}
