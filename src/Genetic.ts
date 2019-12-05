import Calc from './Calc'
import { Move } from '../calc/dist/move';

global['Calc'] = Calc;
global['Move'] = Move;

const UsageData = require('../../pikalytics/server/data_json/2019-10/moveset/ss-1760.json');

const defenders = [];
let monCount = 0;
for (let i in UsageData) {
  if (monCount > parseInt(process.argv[3])) break;
  monCount += 1;
  defenders.push(UsageData[i])
}

const Genetic = require('genetic-js');

const poke = process.argv[2];

let attackerUsage = null;
for (let i in UsageData) {
  if (UsageData[i].name.toLowerCase() === poke.toLowerCase()) {
    attackerUsage = UsageData[i];
    break;
  }
}

if (attackerUsage === null) process.exit();

global['poke'] = poke;
global['defenders'] = defenders;
global['attackerUsage'] = attackerUsage;

var genetic = Genetic.create();

genetic.optimize = Genetic.Optimize.Maximize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.Tournament2;

genetic.seed = function () {
  let total = 0;
  const spread = [0, 0, 0, 0, 0, 0];
  while (total < 508) {
    let index = Math.floor((Math.random() * 6));
    while (spread[index] > 248) {
      index = Math.floor((Math.random() * 6));
    }
    spread[index] += 4;
    total += 4;
  }
  return spread;
};

genetic.mutate = function (entity) {

  let indexToIncrement = Math.floor((Math.random() * 6));
  while (entity[indexToIncrement] > 248) {
    indexToIncrement = Math.floor((Math.random() * 6));
  }

  let indexToDecrement = Math.floor((Math.random() * 6));
  while (indexToDecrement == indexToIncrement || entity[indexToDecrement] <= 4) {
    indexToDecrement = Math.floor((Math.random() * 6));
  }

  const newEntity = [...entity];

  newEntity[indexToIncrement] += 4;
  newEntity[indexToDecrement] -= 4;

  return newEntity;
};

genetic.crossover = function (mother, father) {
  const son = [
    (mother[0] + father[0]) / 2,
    (mother[1] + father[1]) / 2,
    (mother[2] + father[2]) / 2,
    (mother[3] + father[3]) / 2,
    (mother[4] + father[4]) / 2,
    (mother[5] + father[5]) / 2,
  ];

  return [son.slice(), son.slice()];
};

genetic.fitness = function (entity) {
  const spread = {
    hp: entity[0],
    atk: entity[1],
    def: entity[2],
    spa: entity[3],
    spdef: entity[4],
    spe: entity[5],
  };
  let fitness = 0;
  let count = 0;
  for (let i in global['defenders']) {
    let didAttackerDie = false;
    let defenderResults = [];
    for (let j in global['defenders'][i].moves) {
      const move = new (global['Move'])(8, (global['defenders'][i].moves)[j]['move']);
      if (move.bp > 0
        && [].indexOf(move.name) === -1
        && ['Mimikyu-Busted'].indexOf(global['defenders'][i].name) === -1) {
        const calc = new global['Calc'](global['defenders'][i].name, global['poke'], { move: move.name }, spread);
        defenderResults.push(calc);
        if (calc.didDefenderDie()) didAttackerDie = true;
      }
    }

    let isAttackerFirst = false;
    let didDefenderDie = false;
    let attackerResults = [];
    for (let j in global['attackerUsage'].moves) {
      const move = new (global['Move'])(8, (global['attackerUsage'].moves)[j]['move']);
      if (move.bp > 0
        && [].indexOf(move.name) === -1
        && ['Mimikyu-Busted'].indexOf(global['defenders'][i].name) === -1) {
        const calc = new global['Calc'](global['poke'], global['defenders'][i].name, { move: move.name }, {}, spread);
        attackerResults.push(calc);
        if (calc.didDefenderDie()) didDefenderDie = true;
        if (calc.isAttackerFirst()) isAttackerFirst = true;
      }

      if (isAttackerFirst || !didAttackerDie) {
        for (let i in attackerResults) {
          const calc = attackerResults[i];
          const score = calc.getScore();
          if (!isNaN(score)) {
            count += 1;
            fitness += score;
          }
        }
      }

      if (!isAttackerFirst || !didDefenderDie) {
        for (let i in defenderResults) {
          const calc = defenderResults[i];
          const score = calc.getScore();
          if (!isNaN(score)) {
            count += 1;
            fitness -= score;
          }
        }
      }

    }
  };

  return fitness / count;
};

genetic.generation = function (pop, generation, stats) {
  // stop running once we've reached the solution
  return true; //pop[0].entity != this.userData["solution"];
};

genetic.notification = function (pop, generation, stats, isFinished) {
  console.log(generation, pop[0].fitness.toPrecision(5), pop[0].entity)
};

var config = {
  "iterations": 4000
  , "size": process.argv[4]
  , "crossover": 0.3
  , "mutation": 0.3
  , "skip": 2
};

var userData = {

};

genetic.evolve(config, userData);
