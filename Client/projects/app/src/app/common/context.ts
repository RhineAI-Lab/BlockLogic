insertScript();

export function runInContext(context: object, code: string): void {
  return _runInContext(context, code);
}

/**
 * Bypass the unavailability of the `with` syntax in JavaScript strict mode.
 */
function insertScript(): void {
  const $script = document.createElement('script');
  $script.innerText = `
function _runInContext(context, code) {
  with(context) {
  eval(code);
  }
}
`;
  document.head.append($script);
}

declare const _runInContext: typeof runInContext;
