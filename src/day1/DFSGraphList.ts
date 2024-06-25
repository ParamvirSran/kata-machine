export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];

    if (walk(source, graph, needle, seen, path)) {
        return path;
    }
    return null;
}

function walk(curr: number, graph: WeightedAdjacencyList, needle: number, seen: boolean[], path: number[]): boolean {
    seen[curr] = true;
    path.push(curr);

    if (curr === needle) {
        return true;
    }
    const adjacent: GraphEdge[] = graph[curr];
    for (let i = 0; i < adjacent.length; i++) {
        if (!seen[adjacent[i].to] && adjacent[i].weight > 0) {
            if (walk(adjacent[i].to, graph, needle, seen, path)) {
                return true;
            }
        }
    }
    path.pop();
    return false;
}
