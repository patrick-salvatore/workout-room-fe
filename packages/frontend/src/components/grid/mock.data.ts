import { DefaultRows } from './interface';

const defaultColHeader =  ['Lifts', 'Weight', 'Sets', 'Reps'];

const testRowsData: DefaultRows[] = [
  {
    lift: 'clean',
    weight: 'test3',
    sets: 'test88',
    reps: 'test4',
  },
  {
    lift: 'test',
    weight: 'test3',
    sets: 'test88',
    reps: 'test4',
  },
  {
    lift: 'test2',
    weight: 'test3',
    sets: 'test88',
    reps: 'test4',
  },
  {
    lift: 'test22',
    weight: 'test3',
    sets: 'test88',
    reps: 'test4',
  },
];

export default { 
  defaultColHeader,
  testRowsData
}