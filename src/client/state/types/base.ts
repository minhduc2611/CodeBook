export type Entity<T> = T;
export type Nullable<T> = T | null;

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
export type ArrayElement<ArrayType extends unknown[]> =
  ArrayType extends (infer ElementType)[] ? ElementType : never;

export type ArrayToObjectByKey<
  T extends ArrayElement<T>[],
  Key extends keyof ArrayElement<T>
> = {
  [key in Key]: ArrayElement<T>;
};
