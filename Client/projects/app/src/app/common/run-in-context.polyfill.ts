/**
 * Bypass the unavailability of the `with` syntax in JavaScript strict mode.
 */

const $script = document.createElement('script');
$script.innerText = `
function runInContext(context, code) {
  with(context) {
  eval(code);
  }
}
`;
document.head.append($script);

declare global {
  function runInContext(context: object, code: string): void;
}

export {}; // mark as a module
