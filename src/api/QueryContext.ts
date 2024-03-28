export type QueryContext<T> = {
  queryKey: String,
  queryFn: Promise<T>
}
