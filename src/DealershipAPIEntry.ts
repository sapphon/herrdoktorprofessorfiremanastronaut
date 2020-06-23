export interface Dealership1Entry{
    vin: string;
    done: boolean;
    lineItems: {description: string}[]
}

export interface Dealership2Entry {
    vin: string;
    description: string;
}