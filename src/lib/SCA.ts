// deno-lint-ignore-file no-explicit-any

// Augment the Deno namespace for safety at type-check-time.
declare namespace Deno {
  export namespace core {
    export function serialize (input: any): Uint8Array
    export function deserialize (input: Uint8Array): any
  }
}

/** Encode a value to Uint8Array using the structured clone algorithm. */
export function encode (input: any): Uint8Array {
  try {
    return Deno.core.serialize(input)
  } catch (e) {
    if (Object.prototype.isPrototypeOf.call(TypeError.prototype, e)) {
      throw new DOMException('Uncloneable value', 'DataCloneError')
    }

    throw e
  }
}

/** Decode a value from Uint8Array using the structured clone algorithm. */
export function decode (input: Uint8Array): any {
  return Deno.core.deserialize(input)
}
