export const range = (n: number) => [...Array.from(Array(n).keys())];

export const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
};

export const addAll = (set1: Set<number>, set2: Set<number>) => {
    let set3 = set1;
    set2.forEach(element => {set3.add(element);});
    return set3;
}

export const areSetsEqual = (a: Set<number>, b: Set<number>) => a.size === b.size && Array.from(a).every(value => b.has(value));
