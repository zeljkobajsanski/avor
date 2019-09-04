export function matrix(rows: any[], columns: any[]) {
    const result: any[] = [];

    rows.forEach((i1, ix1) => {
        columns.forEach((i2, ix2) => {
            result.push({row: ix1, column: ix2, rowObject: i1, columnObject: i2});
        });
    });
    return result;
}
