export default function dijkstra_list(source: number, sink: number, arr: WeightedAdjacencyList): number[] {
    const distances: number[] = new Array(arr.length).fill(Infinity);
    const parent: number[] = new Array(arr.length).fill(null);
    const visited: boolean[] = new Array(arr.length).fill(false);
    const queue: number[] = [source];
    distances[source] = 0;

    while (queue.length > 0) {
        const curr = queue.splice(find_min(queue, distances), 1)[0];

        if (curr === sink) {
            break;
        }
        visited[curr] = true;

        // Relax adjacent edges of current node
        for (const edge of arr[curr]) {
            if (!visited[edge.to]) {
                relax(parent, distances, edge, curr);
                if (!queue.includes(edge.to)) {
                    queue.push(edge.to);
                }
            }
        }
    }
    // Reconstruct path from sink to source
    const path: number[] = [];
    for (let curr: number | null = sink; curr !== null; curr = parent[curr]) {
        path.push(curr);
    }
    return path.reverse();
}

// Get minimum distance node to visit next
function find_min(queue: number[], distances: number[]): number {
    let smallest_distance = Infinity;
    let currentIndex = 0;

    for (let i = 0; i < queue.length; i++) {
        if (distances[queue[i]] < smallest_distance) {
            smallest_distance = distances[queue[i]];
            currentIndex = i;
        }
    }
    return currentIndex;
}

// Update distance and parent of neighbor from the current node if better route found
function relax(parent: (number | null)[], distances: number[], edge: GraphEdge, curr: number) {
    if (distances[edge.to] > distances[curr] + edge.weight) {
        distances[edge.to] = distances[curr] + edge.weight;
        parent[edge.to] = curr;
    }
}
