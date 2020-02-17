const args = process.argv;

let UsageData = null;

import { Move } from "../damage-calc/calc/dist/move";
import Calc from "./Calc";

const runningAsScript = !module.parent;

const PikaCalc = (
  attacker: string,
  defenders?: String | Array<string>,
  inputMove?: string
): {
  // Defender name
  [key: string]: {
    // Move name
    [key: string]: {
      // Move results
      blankResult: { [key: string]: any };
      hpResult: { [key: string]: any };
      defResult: { [key: string]: any };
      hpDefResult: { [key: string]: any };
    };
  };
} => {
  if (typeof defenders === "string") defenders = [defenders];

  if (defenders === undefined || defenders === null) {
    defenders = [];
    for (let i = 0; i < 10; i++) {
      defenders.push(UsageData[i].name);
    }
  }

  let MonUsage = null;
  for (let i in UsageData) {
    if (UsageData[i].name.toLowerCase() === attacker.toLowerCase()) {
      MonUsage = UsageData[i];
      break;
    }
  }

  // Usage data not found, return
  if (MonUsage === null) return;

  const results = {};

  for (let defenderIndex in defenders) {
    const defender = defenders[defenderIndex];

    let moves = MonUsage.moves;
    if (inputMove !== null && inputMove !== undefined)
      moves = [{ move: inputMove }];

    for (let moveIndex in moves) {
      const move = new Move(8, moves[moveIndex].move);
      if (move.bp <= 0 || move.name === "Detect" || move.name === "Other")
        continue;

      let blankResult = new Calc(attacker, defender, moves[moveIndex]);
      let hpResult = new Calc(attacker, defender, moves[moveIndex], {
        hp: 252
      });

      var defResult = null;
      if (move.category === "Physical") {
        defResult = new Calc(attacker, defender, moves[moveIndex], {
          def: 252
        });
      } else if (move.category === "Special") {
        defResult = new Calc(attacker, defender, moves[moveIndex], {
          spdef: 252
        });
      }

      var hpDefResult = null;
      if (move.category === "Physical") {
        hpDefResult = new Calc(attacker, defender, moves[moveIndex], {
          hp: 252,
          def: 252
        });
      } else if (move.category === "Special") {
        hpDefResult = new Calc(attacker, defender, moves[moveIndex], {
          hp: 252,
          spdef: 252
        });
      }

      if (runningAsScript) {
        console.log(`--- ${move.name} -------------`);
        if (blankResult !== null) blankResult.print();
        if (hpResult !== null) hpResult.print();
        if (defResult !== null) defResult.print();
        if (hpDefResult !== null) hpDefResult.print();
      }

      if (!results.hasOwnProperty(defender)) results[defender] = {};
      results[defender][move.name] = {
        blankResult,
        hpResult,
        defResult,
        hpDefResult
      };
    }
  }

  return results;
};

if (runningAsScript) {
  process.argv.shift();
  process.argv.shift();

  const UsagePath = process.argv[0];
  UsageData = require(UsagePath);

  process.argv.shift();
  const attacker = process.argv[0];
  process.argv.shift();

  let defenders = null;
  // Do we have a defender?
  if (process.argv.length > 0) {
    defenders = [process.argv[0]];
    process.argv.shift();
  }

  let inputMove = null;
  if (process.argv.length > 0) {
    inputMove = process.argv.join(" ");
  }
  PikaCalc(attacker, defenders, inputMove);
}

export { PikaCalc };
