export function dealership2ToDealership1Converter(lineItems){
    return Object.entries(aggregateDealership2Data(lineItems)).map(([key, value]) => {
        return {
            vin: key,
            lineItems: value.map((lineItemDescription) => {
                return {description:lineItemDescription}
            }),
            done: value.some((lineItemDescription) => {
                return lineItemDescription === "Complete"
            })
        }
    });
}

export function aggregateDealership2Data(lineItems){
    return lineItems.reduce((accumulator, entry) => {
        if(accumulator[entry.vin] === undefined){
            accumulator[entry.vin] = [entry.description];
        }
        else{
            accumulator[entry.vin].push(entry.description)
        }
        return accumulator;
    }, {})
}