
export class Helpers {

    public static ConvertToCSV(arr: any[]) {
        const array = [Object.keys(arr[0])].concat(arr)

        return array.map(it => {
            return Object.values(it).toString()
        }).join('\n')
    }

    public static LoadFromCsv<T>(csvString: string): any {
        var arr = csvString.split('\n');
        var jsonObj: T[] = [];
        var headers = arr[0].split(',');
        for (var i = 1; i < arr.length; i++) {
            var data = arr[i].split(',');
            var obj: any = {};
            for (var j = 0; j < data.length; j++) {
                obj[headers[j].trim()] = data[j].trim();
            }
            jsonObj.push(JSON.parse(JSON.stringify(obj)) as T);
        }

        return jsonObj;
    }
}