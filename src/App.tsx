import React, {useState, useEffect} from 'react';
import './App.css';
import {string} from "prop-types";
import {processDealerData} from "./dealer_conversion_processor";
import {VehicleBucket} from "./VehicleBucket";

function App() {
    const [vehicleBuckets, setVehicleBuckets] = useState<VehicleBucket[]>([]);

    useEffect(() => {
        processDealerData().then((buckets) => {
           setVehicleBuckets(buckets);
        });
    }, []);

  return (
    <div className="App">
        <h1>Not Started</h1>
        <div className="vehicles_notstarted">
            <ul>{renderBucketAsListItems(vehicleBuckets, "notstarted")}</ul>
        </div>
        <h1>Work in Progress</h1>
        <div className="vehicles_wip">
            <ul>{renderBucketAsListItems(vehicleBuckets, "wip")}</ul>
        </div>
        <h1>Complete</h1>
        <div className="vehicles_completed">
            <ul>{renderBucketAsListItems(vehicleBuckets, "complete")}</ul>
        </div>
    </div>
  );
}

function renderBucketAsListItems(buckets: VehicleBucket[], status: string){
    let correctBucket = buckets.find((bucket) => bucket.status === status);
    if(!correctBucket) return <></>;
    return correctBucket.vehicles.map((vehicle) => <li key={vehicle.vin}>{vehicle.vin}</li>);
}

export default App;
