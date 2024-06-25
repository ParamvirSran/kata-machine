export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const parent = new Array(graph.length).fill(-1);

    seen[source] = true;
    const q: number[] = [source];

    while (q.length > 0) {
        const curr = q.shift() as number;

        if (curr === needle) {
            break;
        }

        const next = graph[curr];
        for (let i = 0; i < next.length; i++) {
            if (next[i] > 0 && !seen[i]) {
                seen[i] = true;
                parent[i] = curr;
                q.push(i);
            } else {
                continue;
            }
        }
    }
    if (parent[needle] === -1) {
        return null;
    }
    let curr = needle;
    const out: number[] = [];
    while (parent[curr] !== -1) {
        out.push(curr);
        curr = parent[curr];
    }
    return [source].concat(out.reverse());
}
