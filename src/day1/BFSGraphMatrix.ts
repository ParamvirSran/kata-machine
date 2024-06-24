export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    const visited: boolean[] = new Array(graph.length).fill(false);
    const q: number[] = [];
    const path: number[] = [];
    const parent: (number | null)[] = new Array(graph.length).fill(null);

    q.push(source);
    visited[source] = true;

    while (q.length > 0) {
        const curr = q.shift();
        if (curr === undefined) {
            continue;
        }
        if (curr === needle) {
            let node: number | null = curr;
            while (node !== null) {
                path.push(node);
                node = parent[node];
            }
            return path.reverse();
        }

        for (let i = 0; i < graph[curr].length; i++) {
            if (graph[curr][i] > 0 && !visited[i]) {
                visited[i] = true;
                parent[i] = curr;
                q.push(i);
            }
        }
    }
    return null;
}
