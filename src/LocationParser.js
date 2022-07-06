import React from "react";

export default function LocationParse(inString){
    let outVal = {"value":"","type":""};
    outVal.value = inString.replace(" ", "-");
    if (!isNaN(outVal["value"]) && outVal["value"].length == 5){
        outVal.type = "postalCode";
    } else if (outVal["value"].includes(",")) {
        outVal.type = "coords";
    } else if (outVal["value"].length == 3) {
        outVal.type = "airport";
    } else {outVal.type = "city"};
    return(outVal);
}