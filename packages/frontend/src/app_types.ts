type Count<C, S extends 0[] = []> = C extends S['length'] ? S : Count<C, [...S, 0]>;

type Inc<N> = [...Count<N>, 0]['length'];
type Dec<N> = Count<N> extends [infer _, ...infer Tail] ? Tail['length'] : 0;

type RangeList<N extends number, R extends number[] = []> = N extends 0
  ? R[number]
  : RangeList<Dec<N>, [N, ...R]>;
