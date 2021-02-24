const { Pokemon, Trainer } = require('./pokemon-battler');

let bulbasaur;
let ash;

beforeEach(() => {
  bulbasaur = new Pokemon('Bulbasaur', 50, 60, 'arrghh');
  pikachu = new Pokemon('Pikachu', 45, 65, 'pikachuuu');
  ash = new Trainer('Ash', [bulbasaur, pikachu]);
});

describe('Pokemon class', () => {
  it('return pokemon with a name property given as argument', () => {
    expect(bulbasaur.name).toBe('Bulbasaur');
  });
  it('return pokemon with a hitPoints property given as argument', () => {
    expect(bulbasaur.hitPoints).toBe(50);
  });
  it('return pokemon with an attackDamage property given as argument', () => {
    expect(bulbasaur.attackDamage).toBe(60);
  });
  it('return pokemon with a sound property given as argument', () => {
    expect(bulbasaur.cry).toBe('arrghh');
  });
});
describe('Trainer class', () => {
  it('return trainer with a name property given as argument', () => {
    expect(ash.name).toBe('Ash');
  });
  it('return trainer with a storage property given as argument', () => {
    expect(ash.storage).toEqual([bulbasaur, pikachu]);
  });
});
