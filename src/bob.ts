import { PikaCalc } from './index';

const results = PikaCalc('Gyarados');
for (let i in results) {
  for (let j in results[i]) {
    console.log(`--- ${i} - ${j} ---------`)
    for (let k in results[i][j]) {
      results[i][j][k].print()
    }
  }
}