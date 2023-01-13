import { createScheduledFunction } from "inngest";
import { api } from "../services/api";

const job1 = async () => {
    console.log("Schedule Task #1: Fake reserves.");
    return await api.get("/create/fake-reserves");
}

const job2 = async () => {
    console.log("Schedule Task #2: Clear Expired reserves.");
    return await api.get("/clear/expired-reserves");
}

const fakeReservations = createScheduledFunction(
    "Fake reserves function", // The name of your function, used for observability.
    "0 4 * * *",     // The cron syntax for the function
    job1,             // The function code, defined above.
)

const clearExpiredReserves = createScheduledFunction(
    "Clear expired reserves function", // The name of your function, used for observability.
    "0 3 * * *",     // The cron syntax for the function
    job2,             // The function code, defined above.
)

export { fakeReservations, clearExpiredReserves }