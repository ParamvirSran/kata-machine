export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0;
    let high = haystack.length;

    while (low < high) {
        const mid = Math.floor(low + (high - low) / 2);
        const val = haystack[mid];

        if (val === needle) {
            return true;
        } else if (val < needle) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return false;
}
