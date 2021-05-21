export type CalActivitySchemaType = {
  [a: string]: { sets: number | string; reps: number | string; weight: number | string | null };
};

export type CalActivityType = {
  activity_title: string;
  activity_schema: CalActivitySchemaType;
  activity_input: string | null;
  activity_id: number;
};

export type CalActivitiesType = CalActivityType[][];

export type CalActivitySetType = { [id: number]: CalActivitiesType };

export type CalActivityMetaData = {
  title: string;
  date: Date;
  id: number;
  notes?: string;
  activity_id: number;
};

export type CalActivityMetaDataList = CalActivityMetaData[];
