import Axios from "axios";
import {dealership2ToDealership1Converter} from "./converter";
import {Dealership1Entry, Dealership2Entry} from "./DealershipAPIEntry";
import {VehicleBucket} from "./VehicleBucket";

export async function processDealerData(): Promise<VehicleBucket[]> {
    let d1Data: Dealership1Entry[] = (await Axios.get<Dealership1Entry[]>('https://dealership1.apps.pd01e.edc1.cf.ford.com/api/vehicle')).data;
    let d2Data: Dealership2Entry[] = (await Axios.get<Dealership2Entry[]>('https://dealership2.apps.pd01e.edc1.cf.ford.com/api/line-item')).data;
    //@ts-ignore
    let combinedData = d1Data.concat(dealership2ToDealership1Converter(d2Data));
    let vehicleBuckets = [{status: "notstarted", vehicles: []}, {status: "wip", vehicles: []}, {status: "complete", vehicles: []}];
    //@ts-ignore

    return combinedData.reduce((buckets, vehicle) => {
        let vehicleStatus = JeffMcLendon(vehicle);
        let bucketForStatus : VehicleBucket | undefined = buckets.find((bucket) => {return bucket.status === vehicleStatus});
        if(bucketForStatus) bucketForStatus.vehicles.push({vin: vehicle.vin});
        return buckets;
    }, vehicleBuckets);

}

function JeffMcLendon(vehicle: Dealership1Entry): string {
    if(vehicle.done){
        return "complete"
    }
    else if(vehicle.lineItems.some((lineItem) => !lineItem.description.includes("Arrive"))){
        return "wip"
    }
    else{
        return "notstarted"
    }
}

