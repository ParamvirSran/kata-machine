export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const parent = new Array(graph.length).fill(-1);
    const queue: number[] = [source];
    seen[source] = true;

    while (queue.length > 0) {
        const curr = queue.shift() as number;
        if (curr === needle) {
            break;
        }
        const neighbors = graph[curr];
        for (let i = 0; i < neighbors.length; i++) {
            if (neighbors[i] > 0 && !seen[i]) {
                queue.push(i);
                parent[i] = curr;
                seen[i] = true;
            }
        }
    }
    if (parent[needle] === -1) {
        return null;
    }
    const path: number[] = [];
    for (let curr = needle; curr !== -1; curr = parent[curr]) {
        path.push(curr);
    }
    return path.reverse();
}
