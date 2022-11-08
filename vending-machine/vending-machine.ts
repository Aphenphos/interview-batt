// Implement your vending machine here!
import { assert } from "node:console";
import process from "node:process";
// going for put in any currency option through currency.json however my json import is breaking and I am just going to bypass it for purpose of the assignment by hardcoding the array here.

const rawCurrencies = [
  {
    name: "shmokeldorps",
    value: 95,
  },
  {
    name: "dinglebops",
    value: 4,
  },
  {
    name: "goypers",
    value: 9,
  },
  {
    name: "doogleboles",
    value: 19,
  },
];

//sorts currency array to make sure it is always in descending order

const currencies = rawCurrencies.sort((c, d) => d.value - c.value);

// let arg = null;
let cost = 125;
let payment = 151;

// while ((arg = process.argv.shift()) != null) {
//   if (arg == "--item-cost") {
//     const costInput = process.argv.shift();
//     cost = Math.floor(Number(costInput || "0") * 100);
//   } else if (arg == "--payment") {
//     const paymentInput = process.argv.shift();
//     payment = Math.floor(Number(paymentInput || "0") * 100);
//   }
// }

console.error("--item-cost", cost);
console.error("--payment", payment);

// Narrow cost to a number.
if (cost == null) {
  console.error("--item-cost is required but not provided. Exiting.");
  process.exit(1);
}
if (payment == null) {
  console.error("--payment is required but not provided. Exiting.");
  process.exit(2);
}

async function calcChange(cost: number, payment: number) {
  let owed = payment - cost;
  let change: string[] = [];

  const result = new Promise((res, rej) => {
    currencies.forEach((cur) => {
      //sees if owed amount is divisible by available denominations of change
      //starting with the largest
      const check = Math.floor(owed / cur.value);
      if (check >= 1) {
        const val = check * cur.value;
        change.push(`${check} ${cur.name}`);
        //removes owed amount and adds it to 'dispensed' change
        owed = owed - val;
      }
    });
    res(owed);
  }).then(() => {
    if (owed !== 0) {
      change.push(`cant dispense exact change AKA we stole ${owed} from you `);
    }
    console.log(change);
  });
}

calcChange(cost, payment);
