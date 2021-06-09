export type CalActivitySchemaType = {
  [a: string]: { sets: number | string; reps: number | string; weight: number | string | null };
};

export type CalActivityType = {
  activity_id: number;
  activity_title: string;
  activity_schema: CalActivitySchemaType;
  activity_input: string;
};

export type CalActivitiesType = CalActivityType[];

export type CalSessionType = {
  session_id: string;
  session_main_title: string;
  session_main_notes?: string;
  activities: CalActivitiesType;
};

export type CalSessionSetType = CalSessionType[];

export type CalSessionMapType = {
  [id: number]: CalSessionSetType;
};

export type CalActivityMetaData = {
  date: Date;
  id: number;
  activity_id: number;
};

export type CalActivityMetaDataList = CalActivityMetaData[];
