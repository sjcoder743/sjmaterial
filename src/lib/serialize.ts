export function toPlainObject<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc));
}
