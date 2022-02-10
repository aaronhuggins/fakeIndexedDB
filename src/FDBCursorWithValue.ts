// deno-lint-ignore-file no-explicit-any
import FDBCursor from "./FDBCursor.ts";
import {
    CursorRange,
    CursorSource,
    FDBCursorDirection,
    Value,
} from "./lib/types.ts";

class FDBCursorWithValue extends FDBCursor {
    public value: Value = undefined;

    constructor(
        source: CursorSource,
        range: CursorRange,
        direction?: FDBCursorDirection,
        request?: any,
    ) {
        super(source, range, direction, request);
    }

    public toString() {
        return "[object IDBCursorWithValue]";
    }
}

export default FDBCursorWithValue;
