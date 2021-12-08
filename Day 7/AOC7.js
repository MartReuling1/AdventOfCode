const fs = require("fs");
const example = fs.readFileSync("adventOfCodeDay7/example.txt").toString();
const file = fs.readFileSync("adventOfCodeDay7/puzzleInput.txt").toString();
let input = file.split(/\r?\n/);
const crabsPositions = input[0].split(',').map(f => parseInt(f));
console.log(crabsPositions)
let desiredPosition = 0, leastFuel = 0;
let fuelLibrary = [];
let highToLowPositions = new Array(), lowToHighFuel = new Array();

populateArray(highToLowPositions, crabsPositions);

highToLowPositions.sort(function(a, b) {
    return b-a;
  });

desiredPosition = highToLowPositions[0];

for(let x = 0; x <= desiredPosition; x++){
    calculateFuel(crabsPositions, x);
}

populateArray(lowToHighFuel, fuelLibrary);

console.log(lowToHighFuel.sort(function(a, b) {
    return a-b;
  }))
leastFuel = lowToHighFuel[0];

let horizontalPositionCrabs = calculateLowestHorizontalPosition(crabsPositions, leastFuel, fuelLibrary);

console.log(`We checked the horizontal positions from 0 to ${desiredPosition} and the least amount of fuel to use is ${leastFuel} at a horizontal position of ${horizontalPositionCrabs}`);

function calculateFuel(crabs, pos){
    let fuelUsed = 0;
    for(let i = 0;i < crabs.length; i++){
        let absoluteValue = Math.abs(pos - crabs[i]);
        // part 1: fuelUsed += absoluteValue;
        fuelUsed += (absoluteValue*(absoluteValue+1))/2;        
    };
    fuelLibrary.push(fuelUsed);        
};

function populateArray(arrFill, arrValue){
    for(let y = 0; y < arrValue.length; y++){
        arrFill.push(arrValue[y]);
    }; 
};

function calculateLowestHorizontalPosition(crabs, fuel, fuelArray){
    let horPos = 0;
    for(let i =0; i < crabs.length; i++){
        if(fuelArray[i] === fuel){
            horPos = i;
        };
    };
    return horPos;
}
