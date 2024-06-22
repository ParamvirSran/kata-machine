class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
    if (curr.x < 0 || curr.x >= maze[0].length || curr.y < 0 || curr.y >= maze.length) {
        return false;
    } if (maze[curr.y][curr.x] === wall) {
        return false;
    } if (curr.y === end.y && curr.x === end.x) {
        path.push(new Point(curr.x, curr.y));
        return true;
    } if (seen[curr.y][curr.x]) {
        return false;
    }
    seen[curr.y][curr.x] = true;
    path.push(new Point(curr.x, curr.y));

    const directions = [
        new Point(curr.x + 1, curr.y),
        new Point(curr.x, curr.y + 1),
        new Point(curr.x - 1, curr.y),
        new Point(curr.x, curr.y - 1)
    ];

    for (let i = 0; i < directions.length; i++) {
        if (walk(maze, wall, directions[i], end, seen, path)) {
            return true;
        }
    }
    path.pop();
    return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const seen: boolean[][] = new Array(maze.length);
    for (let i = 0; i < maze.length; i++) {
        seen[i] = new Array(maze[0].length).fill(false);
    }
    const path: Point[] = [];
    if (walk(maze, wall, start, end, seen, path)) {
        return path;
    } else {
        return [];
    }
}
