import { calculate } from '../calc/dist/calc';
import { Pokemon } from '../calc/dist/pokemon';
import { Move } from '../calc/dist/move';

class Calc {
  private move: Move;
  private attacker: Pokemon;
  private defender: Pokemon;
  private result;

  constructor(
    attacker: string,
    defender: string,
    move: { move: string },
    defenderStats: {
      hp?: number,
      atk?: number,
      def?: number,
      spa?: number,
      spdef?: number,
      spe?: number
    } = {}
  ) {
    const moveName = move.move;

    let moveOverrides = {};

    if (moveName.indexOf('Max ') === 0 && moveName !== 'Max Guard') {
      moveOverrides = { bp: 130 };
    }

    this.move = new Move(
      8,
      moveName,
      { overrides: moveOverrides }
    );

    const attackerOptions = {
      level: 50
    };

    const defenderOptions = {
      level: 50,
      evs: defenderStats
    };

    if (this.move.category === 'Physical') {
      attackerOptions['evs'] = { 'atk': 252 };
    } else if (this.move.category === 'Special') {
      attackerOptions['evs'] = { 'spa': 252 };
    }

    this.attacker = new Pokemon(
      8,
      attacker,
      attackerOptions
    );

    this.defender = new Pokemon(
      8,
      defender,
      defenderOptions
    );

    // Run once at 0 Defender EV's
    this.result = calculate(
      8,
      this.attacker,
      this.defender,
      this.move);
  }

  print() {
    if (this.result.damage[0] > 0) console.log(this.result.desc().replace(/OHKO/gi, '***** OHKO *****'));
    else console.log(`${this.move.name} doesn't affect ${this.defender.name}!`);
  }
}

export default Calc;