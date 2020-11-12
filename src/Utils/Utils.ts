/*exporting interfaces does not work currently because 
of this problem https://github.com/webpack/webpack/issues/7378
I am not going to do the work to make the proposed solution
work at the moment, so you will see these interfaces
hand copied at different places
 */
interface Entry {
    arrival: string,
    departure: string,
    createdDate: string,
    isOmitted: boolean,
    service: string,
    port: {
      id: string,
      name: string
    },
    logEntries: object[]
  }

  interface PortInterface {
    callCount: number,
    entries: Entry[],
    vessels: object[]
}

export const getDays = (milli) => {
    return Math.ceil(milli / 8640000);
}

export const getDurations = (entries: [object]) => {
    //TODO should make type defs for entries
    return entries.map((entry: any) => {
        const {arrival, departure} = entry;
        return getDays(Date.parse(departure) - Date.parse(arrival));
    });
}

export const percentile = (arr: number[], p: number) => {   
    if (p <= 0 || arr.length === 1) return arr[0];
    if (p >= 1) return arr[arr.length - 1];       
    arr.sort(function (a, b) { return a - b; });
    const index = (arr.length - 1) * p,
        lower = Math.floor(index),
        upper = lower + 1,
        weight = index % 1;
    
    if (upper >= arr.length) return arr[lower];
    return arr[lower] * (1 - weight) + arr[upper] * weight;
}
/*although calling to the property by dynamic naming
should not be needed here nonetheless, the code seems
to fail on my machine but not anywhere else so I do it as 
a fix*/
export const sortByCallCount = (ports: object): PortInterface[] => {
    return Object.values(ports).sort((a: PortInterface, b: PortInterface) => {
        return b["callCount"] - a["callCount"];
    }) as PortInterface[];
}

