// Baseline so `npm test` has something to run; real component tests live next to their components.
import { MemoryRouter } from "react-router-dom";
test("router is available to tests", () => { expect(typeof MemoryRouter).toBe("function"); });
