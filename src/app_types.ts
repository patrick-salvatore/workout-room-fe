export type Count<C, S extends 0[] = []> = C extends S['length'] ? S : Count<C, [...S, 0]>;

export type Inc<N> = [...Count<N>, 0]['length'];
export type Dec<N> = Count<N> extends [infer _, ...infer Tail] ? Tail['length'] : 0;

export type RangeList<N extends number, R extends number[] = []> = N extends 0
  ? R[number]
  : RangeList<Dec<N>, [N, ...R]>;

export type LabelValuePair<T = string> = {
  label: string;
  value: T;
};
