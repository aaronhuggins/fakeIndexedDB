// Built-in structuredClone arrived in Node 17, so we need to keep this file around as long as we support Node 16

// @ts-ignore
import realisticStructuredClone from "realistic-structured-clone";
import { DataCloneError } from "./errors.ts";

const structuredCloneWrapper = <T>(input: T): T => {
    // @ts-ignore
    if (typeof structuredClone !== "undefined") {
        // @ts-ignore
        return structuredClone(input);
    }

    try {
        return realisticStructuredClone(input);
    } catch (err) {
        throw new DataCloneError();
    }
};

export default structuredCloneWrapper;
