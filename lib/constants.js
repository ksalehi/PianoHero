const Constants = {
  NUM_NOTES: 8,
  HEIGHT: window.innerHeight,
  WIDTH: 1000,
  KEY_HEIGHT: 170,
  TONES: {
    'C': 523.25,
    'D': 587.33,
    'E': 659.25,
    'F': 698.46,
    'G': 783.99,
    'A': 880.00,
    'B': 987.77,
    'C6': 1046.50
  },
  KEYBOARD_MAPPING: {
    65: 'C',
    83: 'D',
    68: 'E',
    70: 'F',
    74: 'G',
    75: 'A',
    76: 'B',
    186: 'C6'
  },
  OCTAVE: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C6'],
  COLOR_MAPPING: {
    'C': '#3BCEFF',
    'D': '#0055F2',
    'E': '#00D192',
    'F': '#FFF04F',
    'G': '#007CCF',
    'A': '#00BF59',
    'B': '#00704B',
    'C6': '#6476C4'
  }
};

module.exports = Constants;
