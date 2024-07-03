export default function prims(list: WeightedAdjacencyList): WeightedAdjacencyList | null {
    const numVertices = list.length;
    if (numVertices === 0) return null;

    const inMST: boolean[] = Array(numVertices).fill(false);
    const minEdge: GraphEdge[] = Array(numVertices).fill({ to: -1, weight: Infinity });
    const mst: WeightedAdjacencyList = Array.from({ length: numVertices }, () => []);

    minEdge[0] = { to: 0, weight: 0 };

    for (let i = 0; i < numVertices; i++) {
        let u = -1;

        // Find the vertex with the smallest edge weight that is not in the MST
        for (let j = 0; j < numVertices; j++) {
            if (!inMST[j] && (u === -1 || minEdge[j].weight < minEdge[u].weight)) {
                u = j;
            }
        }

        if (minEdge[u].weight === Infinity) {
            return null; // Graph is not connected
        }

        inMST[u] = true;

        // If u is not the starting vertex, add the edge to the MST
        if (u !== 0) {
            const { to, weight } = minEdge[u];
            mst[u].push({ to, weight });
            mst[to].push({ to: u, weight });
        }

        // Update the edges for the vertices adjacent to u
        for (const edge of list[u]) {
            relax(u, edge, inMST, minEdge);
        }
    }
    return mst;
}

function relax(u: number, edge: GraphEdge, inMST: boolean[], minEdge: GraphEdge[]) {
    const { to, weight } = edge;
    if (!inMST[to] && weight < minEdge[to].weight) {
        minEdge[to] = { to: u, weight };
    }
}
