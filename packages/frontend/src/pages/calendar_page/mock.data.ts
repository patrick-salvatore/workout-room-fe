import { CalActivityMetaDataList, CalActivitySetType } from './calendar_types';

export const activities: CalActivitySetType = {
  1: [
    [
      {
        activity_id: 5,
        activity_title: 'Split jerk',
        activity_schema: {
          1: { sets: 1, reps: 2, weight: 80 },
          2: { sets: 3, reps: 2, weight: 75 },
          3: { sets: 1, reps: 2, weight: 70 },
        },
        activity_input: '',
      },
      {
        activity_id: 6,
        activity_title: 'Push press',
        activity_schema: {
          1: { sets: 1, reps: 4, weight: 80 },
          2: { sets: 3, reps: 2, weight: 90 },
          3: { sets: 1, reps: 8, weight: 70 },
        },
        activity_input: '',
      },
      {
        activity_id: 7,
        activity_title: 'KB SA PP',
        activity_schema: {
          1: { sets: 4, reps: '6ea', weight: '25-30kg' },
        },
        activity_input: '',
      },
      {
        activity_id: 8,
        activity_title: 'Incline Db rows ',
        activity_schema: {
          1: { sets: 3, reps: 20, weight: '30-35lbs' },
        },
        activity_input: '',
      },
    ],
    [
      {
        activity_id: 9,
        activity_title: 'Split jerk',
        activity_schema: {
          1: { sets: 1, reps: 2, weight: 80 },
          2: { sets: 3, reps: 2, weight: 75 },
          3: { sets: 1, reps: 2, weight: 70 },
        },
        activity_input: '',
      },
      {
        activity_id: 10,
        activity_title: 'Push press',
        activity_schema: {
          1: { sets: 1, reps: 4, weight: 80 },
          2: { sets: 3, reps: 2, weight: 90 },
          3: { sets: 1, reps: 8, weight: 70 },
        },
        activity_input: 'hello there',
      },
      {
        activity_id: 11,
        activity_title: 'KB SA PP',
        activity_schema: {
          0: { sets: 4, reps: '6ea', weight: '25-30kg' },
        },
        activity_input: '',
      },
      {
        activity_id: 12,
        activity_title: 'Incline Db rows ',
        activity_schema: {
          0: { sets: 3, reps: 20, weight: '30-35lbs' },
        },
        activity_input: '',
      },
    ],
  ],
};

export const activitiesMetaData: CalActivityMetaDataList = [
  {
    title: 'work out 4',
    date: new Date(),
    id: Math.floor(Math.random() * 100),
    notes: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    activity_id: 1,
  },
];
