# pikacalc

Calculate Pokemon Sword and Shield VGC metagame matchups via CLI with pikacalc. Find out how target Pokemon simulate against other meta threats, check specific moves, and more.

## Setup

`yarn setup`

(The compile step in the damage-calc submodule will actually fail, but don't worry, our script's setup still worked)

## Usage

`yarn calc <Absolute Filepath to usage .json> <Attacker> <Defender> [Move Name]`

Usage .json mentioned above may be compiled using my tool [smogon-usage-parser](https://github.com/GriffinLedingham/smogon-usage-parser). This should be an absolute filepath to the ouput file generated by that tool.

## Example

`yarn calc ~/YOUR PATH/smogon-usage-parser/out/2020-01/gen8vgc2020-1760.json Gyarados Rotom-Wash`

This produces the following output:

```
yarn calc v0.15.1
$ node dist/index.js ~/YOUR PATH/smogon-usage-parser/out/2020-01/gen8vgc2020-1760.json Gyarados Rotom-Wash
--- Waterfall -------------
252 Atk Gyarados Waterfall vs. 0 HP / 0 Def Rotom-Wash: 32-38 (25.6 - 30.4%) -- guaranteed 4HKO
252 Atk Gyarados Waterfall vs. 252 HP / 0 Def Rotom-Wash: 32-38 (20.3 - 24.2%) -- guaranteed 5HKO
252 Atk Gyarados Waterfall vs. 0 HP / 252 Def Rotom-Wash: 25-30 (20 - 24%) -- guaranteed 5HKO
252 Atk Gyarados Waterfall vs. 252 HP / 252 Def Rotom-Wash: 25-30 (15.9 - 19.1%) -- possible 6HKO
--- Power Whip -------------
252 Atk Gyarados Power Whip vs. 0 HP / 0 Def Rotom-Wash: 126-150 (100.8 - 120%) -- guaranteed ***** OHKO *****
252 Atk Gyarados Power Whip vs. 252 HP / 0 Def Rotom-Wash: 126-150 (80.2 - 95.5%) -- guaranteed 2HKO
252 Atk Gyarados Power Whip vs. 0 HP / 252 Def Rotom-Wash: 102-120 (81.6 - 96%) -- guaranteed 2HKO
252 Atk Gyarados Power Whip vs. 252 HP / 252 Def Rotom-Wash: 102-120 (64.9 - 76.4%) -- guaranteed 2HKO
--- Bounce -------------
252 Atk Gyarados Bounce vs. 0 HP / 0 Def Rotom-Wash: 33-40 (26.4 - 32%) -- guaranteed 4HKO
252 Atk Gyarados Bounce vs. 252 HP / 0 Def Rotom-Wash: 33-40 (21 - 25.4%) -- 0.4% chance to 4HKO
252 Atk Gyarados Bounce vs. 0 HP / 252 Def Rotom-Wash: 27-32 (21.6 - 25.6%) -- 0.3% chance to 4HKO
252 Atk Gyarados Bounce vs. 252 HP / 252 Def Rotom-Wash: 27-32 (17.1 - 20.3%) -- possible 5HKO
--- Earthquake -------------
Earthquake doesn't affect Rotom-Wash!
Earthquake doesn't affect Rotom-Wash!
Earthquake doesn't affect Rotom-Wash!
Earthquake doesn't affect Rotom-Wash!
--- Stone Edge -------------
252 Atk Gyarados Stone Edge vs. 0 HP / 0 Def Rotom-Wash: 53-63 (42.4 - 50.4%) -- 1.2% chance to 2HKO
252 Atk Gyarados Stone Edge vs. 252 HP / 0 Def Rotom-Wash: 53-63 (33.7 - 40.1%) -- guaranteed 3HKO
252 Atk Gyarados Stone Edge vs. 0 HP / 252 Def Rotom-Wash: 42-50 (33.6 - 40%) -- guaranteed 3HKO
252 Atk Gyarados Stone Edge vs. 252 HP / 252 Def Rotom-Wash: 42-50 (26.7 - 31.8%) -- guaranteed 4HKO
✨  Done in 0.27s.
```
