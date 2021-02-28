const { Pokemon, Trainer, Battle } = require('./pokemon-battler');

let bulbasaur;
let pikachu;
let squirtle;
let staryu;
let ash;
let misty;
let testBattle;

beforeEach(() => {
  bulbasaur = new Pokemon('Bulbasaur', 50, 'arrghh', 'grass', [
    'Tackle',
    'Vine Whip'
  ]);
  pikachu = new Pokemon('Pikachu', 45, 'pikachuuu', 'electric', [
    'Quick Attack',
    'Thunder Shock'
  ]);
  squirtle = new Pokemon('Squirtle', 55, 'squirrtle', 'water', [
    'Tackle',
    'Water Gun'
  ]);
  staryu = new Pokemon('Staryu', 55, 'zzzzzzzz', 'water', [
    'Tackle',
    'Water Gun'
  ]);
  ash = new Trainer('Ash', [bulbasaur, pikachu]);
  misty = new Trainer('Misty', [squirtle, staru]);
  testBattle = new Battle(
    [ash, misty],
    [bulbasaur, pikachu],
    [squirtle, staryu]
  );
});

describe('Pokemon class', () => {
  it('return pokemon with a name property given as argument', () => {
    expect(bulbasaur.name).toBe('Bulbasaur');
  });
  it('return pokemon with a hitPoints property given as argument', () => {
    expect(bulbasaur.hitPoints).toBe(50);
  });
  it('return pokemon with a sound property given as argument', () => {
    expect(bulbasaur.cry).toBe('arrghh');
  });
  it('return pokemon with a type property given as argument', () => {
    expect(bulbasaur.type).toBe('grass');
  });
  it('return pokemon with a moves property given as argument', () => {
    expect(bulbasaur.moves).toEqual(['Tackle', 'Vine Whip']);
  });
  describe('methods: ', () => {
    describe('sound()', () => {
      it("return the pokemon's cry upon function call", () => {
        expect(bulbasaur.sound()).toBe('Bulbasaur: arrghh...');
      });
      it("return pokemon's cry repeated n times as given in function argument", () => {
        expect(bulbasaur.sound(3)).toBe('Bulbasaur: arrghh arrghh arrghh...');
      });
    });
  });
});
describe('Trainer class', () => {
  it('return trainer with a name property given as argument', () => {
    expect(ash.name).toBe('Ash');
  });
  it('return trainer with a storage property given as argument', () => {
    expect(ash.storage).toEqual([bulbasaur, pikachu]);
  });
  describe('methods: ', () => {
    describe('checkMoves()', () => {
      it('returns a string of moves including information on the damage and type for given pokemon as input argument', () => {
        expect(ash.checkMoves('Bulbasaur')).toBe(
          'Tackle: type: normal, damage: 40.\nVine Whip: type: grass, damage: 45.'
        );
      });
      it('returns a rejection string when pokemon not valid', () => {
        expect(ash.checkMoves('Magikarp')).toBe(
          'Magikarp is not available in storage.'
        );
      });
    });
    describe('checkHealth()', () => {
      it('returns a string of pokemon health', () => {
        expect(ash.checkHealth('Bulbasaur')).toBe('Bulbasaur has 50 hp.');
      });
      it('returns a rejection string when pokemon not valid', () => {
        expect(ash.checkHealth('Magikarp')).toBe(
          'Magikarp is not available in storage.'
        );
      });
    });
    describe('checkType()', () => {
      it('returns a string of pokemon type, strengths, and weaknesses', () => {
        expect(ash.checkType('Bulbasaur')).toBe(
          'Bulbasaur is a grass type pokemon. Grass is strong against water, and weak against fire.'
        );
      });
      it('returns a rejection string when pokemon not valid', () => {
        expect(ash.checkType('Magikarp')).toBe(
          'Magikarp is not available in storage.'
        );
      });
    });
  });
});
describe('Battle class', () => {
  it('return battle class with trainers property as array provided as argument ', () => {
    expect(testBattle.trainers).toEqual([ash, misty]);
  });
  it('return battle class with a pokemon property as object with values provided as arguments', () => {
    expect(testBattle.pokemon).toEqual({
      Ash: [bulbasaur, pikachu],
      Misty: [squirtle, staryu]
    });
  });
  it('return battle class with a turn property initialised to 0', () => {
    expect(testBattle.turn).toEqual(0);
  });
  it('return battle class with a message property initialised to an empty string', () => {
    expect(testBattle.message).toEqual('');
  });
  describe('methods: ', () => {
    describe('fight()', () => {
      it.only('return fight message from first pokemon including information on the chosen attack', () => {
        expect(testBattle.fight('Tackle')).toBe('Bulbasaur used Tackle.');
        expect(bulbasaur.health).toBe();
      });
      it('return fight message from second pokemon including information on the chosen attack', () => {
        testBattle.fight('Tackle');
        expect(testBattle.fight('Tackle').toBe('Squirtle used Tackle.'));
      });
      it('return fight message including information on chosen attack and weakness of attack', () => {
        testBattle.fight('Tackle');
        expect(
          testBattle
            .fight('Water Gun')
            .toBe("Squirtle used Water Gun. It's not very effective.")
        );
      });
      it('return fight message including information on chosen attack and strength of attack', () => {
        testBattle.fight('Tackle');
        expect(
          testBattle
            .fight('Water Gun')
            .toBe("Squirtle used Water Gun. It's not very effective.")
        );
      });
    });
  });
});
