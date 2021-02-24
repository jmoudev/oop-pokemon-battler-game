const { Pokemon } = require('./pokemon-battler');

let bulbasaur;

beforeEach(() => {
  bulbasaur = new Pokemon('bulbasaur', 50, 60, 'arrghh');
});

describe('Pokemon class', () => {
  it('return pokemon with a name property given as argument', () => {
    expect(bulbasaur.name).toBe('bulbasaur');
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
  describe('Trainer class', () => {
    it('return trainer with a name property given as argument', () => {});
    it('return trainer with a storage property given as argument', () => {});
  });
});
