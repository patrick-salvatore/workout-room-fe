const defaultColHeader = ['Lifts', 'Weight', 'Sets', 'Reps'];

const testRowsData = [
  {
    0: 'clean',
    1: 'test3',
    2: 'test88',
    3: 'test4',
  },
  {
    0: 'test',
    1: 'test3',
    2: 'test88',
    3: 'test4',
  },
  {
    0: 'test2',
    1: 'test3',
    2: 'test88',
    3: 'test4',
  },
  {
    0: 'test22',
    1: 'test3',
    2: 'test88',
    3: 'test4',
  },
];

export const eventMap = [
  {
    title: 'April 1',
    start: new Date('April 27, 2021').toISOString(),
    id: Math.floor(Math.random() * 100),
    grid: { rows: testRowsData, cols: defaultColHeader },
  },
  {
    title: 'April 2',
    start: new Date('April 19, 2021').toISOString(),
    id: Math.floor(Math.random() * 100),
    notes: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
    grid: { rows: testRowsData, cols: defaultColHeader },
  },
  {
    title: 'May 1',
    start: new Date('May 19, 2021').toISOString(),
    id: Math.floor(Math.random() * 100),
    grid: { rows: testRowsData, cols: defaultColHeader },
  },
  {
    title: 'May 2',
    start: new Date('May 2, 2021').toISOString(),
    id: Math.floor(Math.random() * 100),
    notes: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
    grid: { rows: testRowsData, cols: defaultColHeader },
  },
];
