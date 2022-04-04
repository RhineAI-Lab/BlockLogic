export async function wait(span = 0): Promise<void> {
  return new Promise((r) => setTimeout(r, span));
}
