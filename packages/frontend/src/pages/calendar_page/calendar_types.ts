export type ActivitySchemaType = {
  [a: string]: { sets: number | string; reps: number | string; weight: number | string | null };
};

export type ActivityType = {
  activity_title: string;
  activity_schema: ActivitySchemaType;
  activity_input: string | null;
  activity_id: number;
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
