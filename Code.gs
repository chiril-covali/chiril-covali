function parseINGCSV(fileContent) {
    const rows = fileContent.split('\n');
    const parsedData = [];

    for (let i = 1; i < rows.length; i++) { // Skip header row
        const columns = rows[i].split(';');
        if (columns.length > 9) { // Ensure there are enough columns
            const date = parseDate(columns[1]);
            const amount = parseFloat(columns[2].replace(',', '.'));
            const description = buildDescription(columns[4], columns[5], columns[9]);

            if (!isNaN(amount) && date) {
                parsedData.push({ date, amount, description });
            } else {
                console.error(`Error parsing row ${i}: Invalid amount or date`);
            }
        }
    }
    return parsedData;
}

function parseDate(dateString) {
    const regex = /^([0-2]\d|3[01])\.([0-1]\d|0)\.\d{4}$/; // DD.MM.YYYY
    if (regex.test(dateString)) {
        const parts = dateString.split('.');
        const date = new Date(parts[2], parts[1] - 1, parts[0]); // year, month (zero-based), day
        return date;
    }
    console.error(`Invalid date format: ${dateString}`);
    return null;
}

function buildDescription(col4, col5, col9) {
    const description = `${col4} ${col5} ${col9}`.replace(/Referinta/gi, '').trim();
    return description;
}