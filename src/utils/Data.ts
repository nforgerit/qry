
// inspired by https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#grouping_objects_by_a_property
export function groupBy(arr: Array<unknown>, prop: string) {
  return arr.reduce((accumulator, item) => {
    const key = item[prop];
    if (!accumulator[key]) {
      accumulator[key] = [];
    }
    accumulator[key].push(item);
    return accumulator;
  }, {});
}

export function countSub(arr: {}) {
  const counted = [];

  for (let key in arr) {
    counted.push({
      key,
      count: arr[key].length
    });
  }

  return counted;
}

export function sortBy(arr: Array<unknown>, prop: string, dir = 'ASC') {
  const comparator = (a, b): number => {
    if (a[prop] < b[prop]) {
      return dir === 'ASC' ? -1 : 1;
    }
    if (a[prop] > b[prop]) {
      return dir === 'ASC' ? 1 : -1;
    }
    return 0;
  };

  return arr.sort(comparator)
}