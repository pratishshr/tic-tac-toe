import Board from '../../src/components/board/Board';

const board = new Board(null, {
  cols: 3,
  rows: 3,
  onGameOver: () => {
    return;
  },
});

describe('Board.isFull', () => {
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
      expect(board.isFull(input.state)).toBe(true);
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
      expect(board.isFull(input.state)).toBe(false);
    });
  });
});

describe('Board.rowMatch', () => {
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
      expect(board.rowMatch(input.state, input.index)).toBe(true);
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
      expect(board.rowMatch(input.state, input.index)).toBe(false);
    });
  });
});

describe('Board.colMatch', () => {
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
      expect(board.colMatch(input.state, input.index)).toBe(true);
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
      expect(board.colMatch(input.state, input.index)).toBe(false);
    });
  });
});

describe('Board.diagonalMatch', () => {
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
      expect(board.diagonalMatch(input.state, input.index)).toBe(true);
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
      expect(board.diagonalMatch(input.state, input.index)).toBe(false);
    });
  });
});
