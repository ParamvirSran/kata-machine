export default function bfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
    const visited: boolean[] = new Array(graph.length).fill(false);
    const parent: number[] = new Array(graph.length).fill(-1);
    const queue: number[] = [source];
    visited[source] = true;

    while (queue.length > 0) {
        const curr = queue.shift() as number;
        if (curr === needle) {
            break;
        }
        const adjacent = graph[curr];
        for (let i = 0; i < adjacent.length; i++) {
            if (!visited[adjacent[i].to] && adjacent[i].weight > 0) {
                parent[adjacent[i].to] = curr;
                queue.push(adjacent[i].to);
                visited[adjacent[i].to] = true;
            }
        }
    }
    const path: number[] = [];
    if (parent[needle] === -1) {
        return null;
    }
    for (let curr = needle; curr !== -1; curr = parent[curr]) {
        path.push(curr);
    }
    return path.reverse();
}
