export default function merge_sort(arr: number[]): void {
    let lo = 0;
    let hi = arr.length - 1;
    recurse(arr, lo, hi);
}

function recurse(arr: number[], lo: number, hi: number) {
    if (lo >= hi) {
        return;
    }
    const mid = Math.floor((lo + hi) / 2);
    recurse(arr, lo, mid);
    recurse(arr, mid + 1, hi);
    merge(arr, lo, mid, hi);
}

function merge(arr: number[], lo: number, mid: number, hi: number) {
    const temp = [];
    let i = lo;
    let j = mid + 1;

    while (i <= mid && j <= hi) {
        if (arr[i] <= arr[j]) {
            temp.push(arr[i]);
            i++;
        } else {
            temp.push(arr[j]);
            j++;
        }
    }

    while (i <= mid || j <= hi) {
        if (i <= mid) {
            temp.push(arr[i]);
            i++;
        }
        if (j <= hi) {
            temp.push(arr[j]);
            j++;
        }
    }
    for (let k = lo; k <= hi; k++) {
        arr[k] = temp[k - lo];
    }
}
