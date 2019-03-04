import { Check as Preconditions } from "./Check";

// Needed for backwards compatibility
const of = Preconditions.of;
const check = Preconditions.check;

export {
    Preconditions,
    of,
    check
};