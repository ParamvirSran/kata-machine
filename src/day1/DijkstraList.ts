function has_unvisited(visited: boolean[], distances: number[]): boolean {
    for (let i = 0; i < visited.length; i++) {
        if (!visited[i] && distances[i] < Infinity) {
            return true;
        }
    }
    return false;
}

function minimum_unvisited_index(visited: boolean[], distances: number[]): number {
    let smallest_distance = Infinity;
    let currentIndex = -1;

    for (let i = 0; i < visited.length; i++) {
        if (!visited[i] && distances[i] < smallest_distance) {
            smallest_distance = distances[i];
            currentIndex = i;
        }
    }
    return currentIndex;
}

function relax(parent: number[], distances: number[], edge: GraphEdge, curr: number) {
    let new_path = distances[curr] + edge.weight;

    if (distances[edge.to] > new_path) {
        parent[edge.to] = curr;
        distances[edge.to] = new_path;
    }
}

export default function dijkstra_list(source: number, sink: number, arr: WeightedAdjacencyList): number[] {
    const visited: boolean[] = new Array(arr.length).fill(false);
    const distances: number[] = new Array(arr.length).fill(Infinity);
    const parent: number[] = new Array(arr.length).fill(-1);
    distances[source] = 0;

    while (has_unvisited(visited, distances)) {
        const curr = minimum_unvisited_index(visited, distances);

        if (curr === sink) {
            break;
        }
        visited[curr] = true;

        for (const edge of arr[curr]) {
            if (!visited[edge.to]) {
                relax(parent, distances, edge, curr);
            }
        }
    }
    const path = [];

    for (let curr = sink; curr !== -1; curr = parent[curr]) {
        path.push(curr);
    }
    return path.reverse();
}
