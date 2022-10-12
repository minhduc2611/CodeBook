export type Entity<T> = T;
export type Nullable<T> = T | null;

/** UI states for displaying */
export type UIState<Entity, Extension> = {
  [Properties in
    | keyof Entity
    | keyof Extension]: Properties extends keyof Entity
    ? Entity[Properties]
    : Properties extends keyof Extension
    ? Extension[Properties]
    : never;
};

/** UTILITIES */

/** Getting Array Element Type */
export type ArrayElement<ArrayType extends unknown[]> =
  ArrayType extends (infer ElementType)[] ? ElementType : never;

/** Turning Array into Object */
export type ArrayToObjectByKey<
  T extends ArrayElement<T>[],
  Key extends keyof ArrayElement<T>
> = {
  [key in Key]: ArrayElement<T>;
};

/** Apollo */
export type ApolloResponse<T, QueryName extends string> = {[K in QueryName]: T}