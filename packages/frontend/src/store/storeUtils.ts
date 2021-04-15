import { Action, AnyAction } from 'redux';

type ActionWithPayload<ActionType = string, Payload = undefined> = {
  payload: Payload;
} & Action<ActionType>;

type Reducer<
  S,
  A extends ActionWithPayload<AT, AP>,
  T extends A['type'],
  AT = A['type'],
  AP = A['payload']
> = (s: S, p: SpecificAction<A, T>) => S;

type SpecificAction<
  A extends ActionWithPayload<AT, AP>,
  T extends A['type'],
  AT = A['type'],
  AP = A['payload']
> = Extract<A, ActionWithPayload<T, AP>>;

type ActionReducers<
  S,
  A extends ActionWithPayload<AT, AP>,
  AT extends string = A['type'],
  AP = A['payload']
> = { [Key in AT]: Reducer<S, A, Key> };

export const makeReducer = <
  S,
  A extends ActionWithPayload<AType, APayload>,
  AType extends string = A['type'],
  APayload = A['payload']
>(
  reducersMap: ActionReducers<S, A>,
  initState: S
) => (state: S, action: A) => {
  const reducer = reducersMap[action.type];
  if (!reducer) {
    return state || initState; // no reducer for this action
  }
  return reducer(state, action as any); // TODO fix typings
};

export const isActionOfType = <B extends A, A extends Action = AnyAction>(type: B['type']) => (
  action: A
): action is B => action.type === type;
// this combinator allows to use function working with payload directly on reducer
export const onlyPayload = <S, A extends ActionWithPayload<string, P>, P>(f: (s: S, p: P) => S) => (
  s: S,
  action: A
) => f(s, action.payload);
