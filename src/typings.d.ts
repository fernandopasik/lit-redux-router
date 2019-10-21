declare module 'regexparam' {
  export default function regexparam(
    route: string,
  ): {
    pattern: RegExp;
    keys: [string];
  };
}
