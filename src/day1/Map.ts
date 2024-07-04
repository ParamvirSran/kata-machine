export default class Map<T extends string | number, V> {
    private arr: [T, V][][];
    private itemCount: number;

    constructor(private capacity: number = 20) {
        this.arr = Array.from({ length: capacity }, () => []);
        this.itemCount = 0;
    }

    private hash(key: T): number {
        let hash = 0;
        const keyStr = key.toString();

        for (let i = 0; i < keyStr.length; i++) {
            const char = keyStr.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0;
        }
        return Math.abs(hash) % this.capacity;
    }

    get(key: T): V | undefined {
        const index = this.hash(key);
        const bucket = this.arr[index];

        for (let i = 0; i < bucket.length; i++) {
            const [existingKey, existingValue] = bucket[i];
            if (existingKey === key) {
                return existingValue;
            }
        }
        return undefined;
    }

    set(key: T, value: V): void {
        const index = this.hash(key);
        const bucket = this.arr[index];

        for (let i = 0; i < bucket.length; i++) {
            const [existingKey, _] = bucket[i];
            if (existingKey === key) {
                bucket[i] = [key, value];
                return;
            }
        }
        bucket.push([key, value]);
        this.itemCount++;
    }

    delete(key: T): V | undefined {
        const index = this.hash(key);
        const bucket = this.arr[index];

        for (let i = 0; i < bucket.length; i++) {
            const [existingKey, existingValue] = bucket[i];
            if (existingKey === key) {
                bucket.splice(i, 1);
                this.itemCount--;
                return existingValue;
            }
        }
        return undefined;
    }

    size(): number {
        return this.itemCount;
    }
}
