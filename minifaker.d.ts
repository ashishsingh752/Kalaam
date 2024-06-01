declare module 'minifaker' {
  export function arrayElement<T>(array: T[]): T;
  export function name(options: { locale: string }): string;
  export function jobTitle(): string;
  // Add other exports you use from minifaker
}
