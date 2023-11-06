import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "./packages/ui/vitest.config.ts",
  "./apps/backend/vitest.config.ts",
]);
