import FDBRequest from "./FDBRequest.ts";
import { EventCallback } from "./lib/types.ts";

class FDBOpenDBRequest extends FDBRequest {
    public onupgradeneeded: EventCallback | null = null;
    public onblocked: EventCallback | null = null;

    public toString() {
        return "[object IDBOpenDBRequest]";
    }
}

export default FDBOpenDBRequest;
