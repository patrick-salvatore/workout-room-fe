export type ActivitySchemaType = {
  [a: string]: [number | string, number | string, number | string | null];
};

export type ActivityType = {
  title: string;
  schema: ActivitySchemaType;
  input: string | null;
};

export type ActivitiesType = ActivityType[][];

export type ActivitySetType = { [id: number]: ActivitiesType };

export type ActivityMetaData = {
  title: string;
  date: Date;
  id: number;
  notes?: string;
  activity_id: number;
};

export type ActivityMetaDataList = ActivityMetaData[];

export const activities: ActivitySetType = {
  1: [
    [
      {
        title: 'BS',
        schema: {
          a: [3, 8, null],
        },
        input: '7 don’t look it up until after you do it',
      },
      {
        title: 'Leg press',
        schema: {
          a: [4, 3, null],
        },
        input: 'heavy 4+ plates',
      },
      {
        title: 'Box jumps or broad jumps',
        schema: {
          a: [6, 6, null],
        },
        input: 'get hip extension',
      },
      {
        title: 'Single leg glute bridges',
        schema: {
          a: [3, '10ea', null],
        },
        input: 'don’t let hip rotate',
      },
      {
        title: 'hamstring curls',
        schema: {
          a: [3, 15, null],
        },
        input: 'don’t let hip rotate',
      },
    ],
  ],
  2: [
    [
      {
        title: 'Split jerk',
        schema: {
          a: [1, 2, 70],
          b: [1, 2, 80],
          c: [3, 2, 75],
        },
        input: '',
      },
      {
        title: 'Push press',
        schema: {
          a: [1, 8, 70],
          b: [1, 4, 80],
          c: [3, 2, 90],
        },
        input: '',
      },
      {
        title: 'KB SA PP',
        schema: {
          a: [4, '6ea', '25-30kg'],
        },
        input: '',
      },
      {
        title: 'Incline Db rows ',
        schema: {
          a: [3, 20, '30-35lbs'],
        },
        input: '',
      },
    ],
    [
      {
        title: 'Split jerk',
        schema: {
          a: [1, 2, 70],
          b: [1, 2, 80],
          c: [3, 2, 75],
        },
        input: '',
      },
      {
        title: 'Push press',
        schema: {
          a: [1, 8, 70],
          b: [1, 4, 80],
          c: [3, 2, 90],
        },
        input: 'hello there',
      },
      {
        title: 'KB SA PP',
        schema: {
          a: [4, '6ea', '25-30kg'],
        },
        input: '',
      },
      {
        title: 'Incline Db rows ',
        schema: {
          a: [3, 20, '30-35lbs'],
        },
        input: '',
      },
    ],
  ],
  3: [
    [
      {
        title: 'Hex bar deadlifts',
        input: '',
        schema: {
          a: [6, 2, 120],
        },
      },
      {
        title: 'Snatch grip rdl',
        schema: {
          a: [3, 12, '70-80kg'],
        },
        input: '',
      },
      {
        title: 'Weighted box jumps',
        input: '',
        schema: {
          a: [6, 3, '15-20lbs'],
        },
      },
      {
        title: 'Back extensions',
        input: '',
        schema: {
          a: [3, 10, null],
        },
      },
      {
        title: 'Weighted side GHD holds',
        input: '',
        schema: {
          a: [4, '15s', null],
        },
      },
      {
        title: 'hanging leg raises',
        input: '',
        schema: {
          a: [3, 12, null],
        },
      },
    ],
  ],
  4: [
    [
      {
        title: 'Back squat',
        input: '7 don’t look it up until after you do it',
        schema: {
          a: [4, 8, 100],
        },
      },
      {
        title: 'SL press',
        schema: {
          a: [4, '15ea', null],
        },
        input: '1 plate each side',
      },
      {
        title: 'Weighted box jumps',
        input: '',
        schema: {
          a: [6, 3, '15-20lbs'],
        },
      },
      {
        title: 'SL DB RDL',
        input: '',
        schema: {
          a: [3, '10ea', null],
        },
      },
      {
        title: 'Back extensions',
        input: '',
        schema: {
          a: [3, '15 + 10s hold on last rep', null],
        },
      },
      {
        title: 'Hamstring curls',
        input: '',
        schema: {
          a: [3, 20, null],
        },
      },
    ],
    [
      {
        title: 'Back squat',
        input: '7 don’t look it up until after you do it',
        schema: {
          a: [4, 8, 100],
        },
      },
      {
        title: 'SL press',
        schema: {
          a: [4, '15ea', null],
        },
        input: '1 plate each side',
      },
      {
        title: 'Weighted box jumps',
        input: '',
        schema: {
          a: [6, 3, '15-20lbs'],
        },
      },
      {
        title: 'SL DB RDL',
        input: '',
        schema: {
          a: [3, '10ea', null],
        },
      },
      {
        title: 'Back extensions',
        input: '',
        schema: {
          a: [3, '15 + 10s hold on last rep', null],
        },
      },
      {
        title: 'Hamstring curls',
        input: '',
        schema: {
          a: [3, 20, null],
        },
      },
    ],
  ],
};

export const activitiesMetaData: ActivityMetaDataList = [
  {
    title: 'work out 1',
    date: new Date('April 19, 2021'),
    id: Math.floor(Math.random() * 100),
    notes: '',
    activity_id: 1,
  },
  {
    title: 'work out 2',
    date: new Date('April 21, 2021'),
    id: Math.floor(Math.random() * 100),
    activity_id: 4,
  },
  {
    title: 'work out 3',
    date: new Date('April 23, 2021'),
    id: Math.floor(Math.random() * 100),
    activity_id: 3,
  },
  {
    title: 'work out 4',
    date: new Date(),
    id: Math.floor(Math.random() * 100),
    notes: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    activity_id: 2,
  },
];
