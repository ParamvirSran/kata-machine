export default function quick_sort(arr: number[]): void {
    quicksort(arr, 0, arr.length - 1);
}

function quicksort(arr: number[], p: number, r: number): void {
    if (p < r) {
        let q: number = partition(arr, p, r);
        quicksort(arr, p, q - 1);
        quicksort(arr, q + 1, r);
    }
}

function partition(arr: number[], p: number, r: number): number {
    let x = arr[r];
    let i = p - 1;
    for (let j = p; j < r; j++) {
        if (arr[j] < x) {
            i++;
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    let temp = arr[i + 1];
    arr[i + 1] = arr[r];
    arr[r] = temp;
    return i + 1;
}
