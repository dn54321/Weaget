/**
 * The `filer2` function in TypeScript separates an array into two arrays based on a given condition.
 * @param {T[]} arr - An array of elements of type T that you want to sort based on a given condition.
 * @param condition - The `condition` parameter is a function that takes an item of type `T` as its
 * argument and returns a boolean value based on some condition. This function is used to determine
 * whether an item should be placed in the `truthyArray` or the `falsyArray` during the sorting process
 * @returns The `filer2` function returns an array containing two arrays - the first array contains
 * elements from the input array `arr` that satisfy the condition specified by the `condition`
 * function, and the second array contains elements that do not satisfy the condition.
 */
export function filter2<T>(arr: T[], condition: (item: T) => boolean) {
    const truthyArray = [];
    const falsyArray = [];

    for (const item of arr) {
        if (condition(item)) {
            truthyArray.push(item);
        } else  {
            falsyArray.push(item);
        }
    }

    return [truthyArray, falsyArray];
}


/**
 * The function `round` takes a number and rounds it to a specified number of decimal places.
 * @param {number} num - The `num` parameter is the number that you want to round to a specific number
 * of decimal places.
 * @param {number} decimal - The `decimal` parameter in the `round` function specifies the number of
 * decimal places to round the `num` parameter to.
 * @returns The `round` function is returning the number `num` rounded to the specified number of
 * `decimal` places.
 */
export function round(num: number, decimal: number) {
    return +num.toFixed(decimal);
}

/**
 * The function xand2 takes two arrays and returns two arrays containing elements that are unique to
 * each input array.
 * @param {T[]} arr1 - An array of elements of type T.
 * @param {T[]} arr2 - It seems like you were about to provide some information about the `arr2`
 * parameter in the `xand2` function. Could you please complete your sentence or let me know how I can
 * assist you further with this function?
 * @returns The `xand2` function returns an array containing two arrays. The first array contains
 * elements that are in `arr1` but not in `arr2`, and the second array contains elements that are in
 * `arr2` but not in `arr1`.
 */
export function xand2<T>(arr1: T[], arr2: T[]) {
    const sarr1 = new Set(arr1);
    const sarr2 = new Set(arr2);
    const res1 = [];
    const res2 = [];

    for (const item of arr1) {
        if (!sarr2.has(item)) {
            res1.push(item);
        }
    }

    for (const item of arr2) {
        if (!sarr1.has(item)) {
            res2.push(item);
        }
    }

    return [res1, res2];
}