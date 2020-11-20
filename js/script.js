function partition(arr, left, right) {
    let mid = arr[Math.floor((left + right) / 2)];

    while (left <= right) {
        while (arr[left] < mid) {
            ++left;
        }
        while (arr[right] > mid) {
            --right;
        }

        if (left >= right) {
            break;
        }

        [arr[left], arr[right]] = [arr[right], arr[left]];
        ++left;
        --right;
    }

    return right;
}

function arrMin(arr) {
    return arr.reduce((a, b) => (a > b ? b : a));
}

function arrMax(arr) {
    return arr.reduce((a, b) => (a < b ? b : a));
}

function arrMedian(arr) {
    let vals = arr.slice();

    let left = 0, right = vals.length - 1;
    let halflen = Math.floor(vals.length / 2);
    while (true) {
        let mid = partition(vals, left, right);

        if (mid == halflen) {
            return vals[mid];
        }
        else if (mid > halflen) {
            right = mid;
        }
        else {
            left = mid + 1;
        }
    }
}

function quicksort(arr, left = -1, right = -1) {
    if (left === -1 || right === -1) {
        left = 0, right = arr.length - 1;
    }
    if (right <= left) {
        return;
    }

    let mid = partition(arr, left, right);
    quicksort(arr, left, mid);
    quicksort(arr, mid + 1, right);
}

let size = 10;
let values = Array.from({ length: size }, (_, __) => Math.round(Math.random() * 2000));

console.log(values);

console.log(arrMin(values));
console.log(arrMax(values));
console.log(arrMedian(values));

console.log(values.sort((a, b) => (a - b)));
quicksort(values);
console.log(values);

let descendants = document.body.querySelectorAll("*");
let tags = {};
descendants.forEach((e) => {
    if (typeof tags[e.tagName] !== "undefined") {
        ++tags[e.tagName];
    }
    else {
        tags[e.tagName] = 1;
    }
});
console.log(tags);