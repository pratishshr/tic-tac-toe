import * as game from '../../src/helpers/game';

describe('game.hasMatch', () => {
  test('should return true if there is a winning state', () => {
    const inputs = [
      {
        state: [
          'X', 'X', 'X',
          '', '', '',
          '', '', '',
        ]
      },
      {
        state: [
          '', '', '',
          'X', 'X', 'X',
          '', '', '',
        ]
      },
      {
        state: [
          '', '', '',
          '', '', '',
          'X', 'X', 'X',
        ],
      },
      {
        state: [
          'X', '', '',
          'X', '', '',
          'X', '', '',
        ],
      },
      {
        state: [
          '', 'X', '',
          '', 'X', '',
          '', 'X', '',
        ],
      },
      {
        state: [
          '', '', 'X',
          '', '', 'X',
          '', '', 'X',
        ],
      },
      {
        state: [
          '', '', 'X',
          '', 'X', '',
          'X', '', '',
        ],
      },
      {
        state: [
          'X', '', '',
          '', 'X', '',
          '', '', 'X',
        ],
      }
    ];

    inputs.forEach((input) => {
      expect(game.hasMatch(input.state)).toBe(true);
    });
  })

  test('should return false if there is no winning state', () => {
    const inputs = [
      {
        state: [
          'X', 'O', 'X',
          'O', 'O', 'X',
          'X', 'X', 'O',
        ]
      },
      {
        state: [
          'X', 'X', 'O',
          'O', 'X', 'X',
          'X', 'O', 'O',
        ]
      },
      {
        state: [
          'O', 'O', 'X',
          'X', 'X', 'O',
          'O', 'X', 'X',
        ],
      },
      {
        state: [
          'X', 'X', 'O',
          'O', 'O', 'X',
          'X', 'O', 'X',
        ],
      }
    ];

    inputs.forEach((input) => {
      expect(game.hasMatch(input.state)).toBe(false);
    });
  })
});

describe('game.isFull', () => {
  test('should return true when if the state is full', () => {
    const inputs = [
      {
        state: [
          'X', 'X', 'X',
          'X', 'X', 'X',
          'X', 'X', 'X',
        ]
      },
      {
        state: [
          'O', 'O', 'O',
          'O', 'O', 'O',
          'O', 'O', 'O',
        ]
      },
      {
        state: [
          'O', 'X', 'X',
          'X', 'O', 'O',
          'X', 'O', 'X',
        ],
      }
    ];

    inputs.forEach((input) => {
      expect(game.isFull(input.state)).toBe(true);
    });
  });

  test('should return false when state is not full', () => {
    const inputs = [
      {
        state: [
          '', '', '',
          '', '', '',
          '', '', '',
        ]
      },
      {
        state: [
          'O', 'O', 'O',
          'O', '', 'O',
          'O', 'O', 'O',
        ]
      },
      {
        state: [
          'O', '', 'X',
          'X', 'O', 'O',
          'X', 'O', 'X',
        ]
      }
    ];

    inputs.forEach((input) => {
      expect(game.isFull(input.state)).toBe(false);
    });
  });
});

describe('game.rowMatch', () => {
  test('should return true when a row has same data', () => {
    const inputs = [
      {
        state: [
          'X', 'X', 'X',
          '', '', '',
          '', '', '',
        ],
        index: 0,
      },
      {
        state: [
          '', '', '',
          'X', 'X', 'X',
          '', '', '',
        ],
        index: 3,
      },
      {
        state: [
          '', '', '',
          '', '', '',
          'X', 'X', 'X',
        ],
        index: 6,
      },
    ];

    inputs.forEach((input) => {
      expect(game.rowMatch(input.state, input.index)).toBe(true);
    });
  });

  test('should return false when a row does not have same data', () => {
    const inputs = [
      {
        state: [
          'X', 'O', 'X',
          '', '', '',
          '', '', '',
        ],
        index: 0,
      },
      {
        state: [
          '', '', '',
          'X', 'X', 'O',
          '', '', '',
        ],
        index: 3,
      },
      {
        state: [
          '', '', '',
          '', '', '',
          'O', 'X', 'O',
        ],
        index: 6,
      },
    ];

    inputs.forEach((input) => {
      expect(game.rowMatch(input.state, input.index)).toBe(false);
    });
  });
});

describe('game.colMatch', () => {
  test('should return true when a column has same data', () => {
    const inputs = [
      {
        state: [
          'X', '', '',
          'X', '', '',
          'X', '', '',
        ],
        index: 0,
      },
      {
        state: [
          '', 'X', '',
          '', 'X', '',
          '', 'X', '',
        ],
        index: 1,
      },
      {
        state: [
          '', '', 'X',
          '', '', 'X',
          '', '', 'X',
        ],
        index: 2,
      },
    ];

    inputs.forEach((input) => {
      expect(game.colMatch(input.state, input.index)).toBe(true);
    });
  });

  test('should return false when any column does not have same data', () => {
    const inputs = [
      {
        state: [
          'X', '', '',
          'X', '', '',
          'O', '', '',
        ],
        index: 0,
      },
      {
        state: [
          '', 'X', '',
          '', 'O', '',
          '', 'X', '',
        ],
        index: 1,
      },
      {
        state: [
          '', '', 'X',
          '', '', 'O',
          '', '', 'X',
        ],
        index: 2,
      },
    ];

    inputs.forEach((input) => {
      expect(game.colMatch(input.state, input.index)).toBe(false);
    });
  });
});

describe('game.diagonalMatch', () => {
  test('should return true when a diagonal has same data', () => {
    const inputs = [
      {
        state: [
          'X', '', '',
          '', 'X', '',
          '', '', 'X',
        ],
        index: 0,
      },
      {
        state: [
          '', '', 'X',
          '', 'X', '',
          'X', '', '',
        ],
        index: 2,
      }
    ];

    inputs.forEach((input) => {
      expect(game.diagonalMatch(input.state, input.index)).toBe(true);
    });
  });

  test('should return false when diagonal does not have same data', () => {
    const inputs = [
      {
        state: [
          'X', '', '',
          '', 'O', '',
          '', '', 'X',
        ],
        index: 0,
      },
      {
        state: [
          '', '', 'X',
          '', 'O', '',
          'X', '', '',
        ],
        index: 2,
      }
    ];

    inputs.forEach((input) => {
      expect(game.diagonalMatch(input.state, input.index)).toBe(false);
    });
  });
});
