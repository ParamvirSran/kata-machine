import { Heap } from 'heap-js';

export default function prims(list: WeightedAdjacencyList): WeightedAdjacencyList | null {
    const num_nodes = list.length;
    if (num_nodes === 0) return null;

    const mst: WeightedAdjacencyList = Array.from({ length: num_nodes }, () => []);
    const visited = new Array<boolean>(num_nodes).fill(false);
    const minHeap = new Heap<[node: number, edge: GraphEdge]>((a, b) => a[1].weight - b[1].weight);

    visited[0] = true;
    list[0].forEach(edge => {
        minHeap.push([0, edge]);
    });

    while (!minHeap.isEmpty()) {
        const [node, edge] = minHeap.pop()!;

        if (visited[edge.to]) continue;

        visited[edge.to] = true;
        mst[node].push({ to: edge.to, weight: edge.weight });
        mst[edge.to].push({ to: node, weight: edge.weight });

        list[edge.to].forEach(neighbor => {
            if (!visited[neighbor.to]) {
                minHeap.push([edge.to, neighbor]);
            }
        });
    }
    if (visited.includes(false)) return null;
    return mst;
}
