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
  misty = new Trainer('Misty', [squirtle, staryu]);
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
    expect(testBattle.pokemon).toEqual([
      [bulbasaur, pikachu],
      [squirtle, staryu]
    ]);
  });
  it('return battle class with a turn property initialised to 0', () => {
    expect(testBattle.turn).toEqual(0);
  });
  it('return battle class with a message property initialised to an empty array', () => {
    expect(testBattle.message).toEqual('');
  });
  it("return battle class with a battlingPokemon property initialised to a zero's array", () => {
    expect(testBattle.battlingPokemon).toEqual([0, 0]);
  });
  it('return battle class with a battleActive property initialised to boolean true', () => {
    expect(testBattle.battleActive).toEqual(true);
  });
  describe('methods: ', () => {
    describe('fight()', () => {
      it('fight method removes hitpoints from defending pokemon of the chosen attack damage and changes message property to attack details', () => {
        testBattle.fight('Tackle');
        expect(squirtle.hitPoints).toBe(15);
        expect(testBattle.message).toBe('Bulbasaur used Tackle.');
      });
      it('message prop on battle is changed if move does not exist on pokemon', () => {
        testBattle.fight('Hyper Beam');
        expect(testBattle.message).toBe(
          'Bulbasaur does not know move Hyper Beam.'
        );
      });
      it('message prop on battle is changed for second pokemon attack', () => {
        testBattle.fight('Tackle');
        testBattle.fight('Tackle');
        expect(testBattle.message).toBe('Squirtle used Tackle.');
      });
      it('fight message includes info on chosen attack and weakness and attack should deal 0.75 x damage', () => {
        testBattle.fight('Tackle');
        testBattle.fight('Water Gun');
        expect(testBattle.message).toBe(
          "Squirtle used Water Gun. It's not very effective."
        );
        expect(bulbasaur.hitPoints).toBe(20);
      });
      it('fight message includes info on chosen attack and strength of attack and attack should deal 1.25 x damage', () => {
        testBattle.fight('Vine Whip');
        expect(testBattle.message).toBe(
          "Bulbasaur used Vine Whip. It's super effective.\nSquirtle fainted."
        );
        expect(squirtle.hitPoints).toBe(0);
      });
      it('fight message moves on to second pokemon attack in party once the first has fainted', () => {
        testBattle.fight('Vine Whip');
        testBattle.fight('Water Gun');
        expect(testBattle.message).toBe(
          "Staryu used Water Gun. It's not very effective."
        );
      });
      it('fight message declares the winner when all pokemon in a party have fainted', () => {
        testBattle.fight('Vine Whip');
        testBattle.fight('Water Gun');
        testBattle.fight('Vine Whip');
        expect(testBattle.message).toBe(
          "Bulbasaur used Vine Whip. It's super effective.\nStaryu fainted.\nMisty is out of usable Pokémon. Ash wins!"
        );
      });
      it('fight message states warning when pokemon in party do not have health', () => {
        testBattle.fight('Vine Whip');
        testBattle.fight('Water Gun');
        testBattle.fight('Vine Whip');
        testBattle.fight('Tackle');
        expect(testBattle.message).toBe('Battle over. Ash wins!');
      });
    });
    describe('checkBattlingPokemon()', () => {
      it('method returns a string of the currently attacking and defending pokemon', () => {
        expect(testBattle.checkBattlingPokemon()).toBe(
          "Ash's Bulbasaur is attacking. Misty's Squirtle is defending."
        );
      });
      it('method returns a string stating battle over when the battleActive property is set to false', () => {
        testBattle.battleActive = false;
        expect(testBattle.checkBattlingPokemon()).toBe(
          'Battle is no longer active.'
        );
      });
    });
  });
});
