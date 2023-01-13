// Within ./pages/api/inngest.ts
import { serve } from "inngest/next";
import { clearExpiredReserves, fakeReservations } from "../../utils/scheduler";

// Create an API that hosts zero functions.
export default serve("smartvaga", [fakeReservations, clearExpiredReserves]);