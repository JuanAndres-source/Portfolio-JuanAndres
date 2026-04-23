import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("interests router", () => {
  describe("interests.getRunning", () => {
    it("returns an array of running achievements", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.interests.getRunning();

      expect(Array.isArray(result)).toBe(true);
      // The result should be an array (even if empty from DB)
      if (result.length > 0) {
        expect(result[0]).toHaveProperty("eventType");
        expect(result[0]).toHaveProperty("time");
      }
    });
  });

  describe("interests.getChess", () => {
    it("returns an array of chess ratings", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.interests.getChess();

      expect(Array.isArray(result)).toBe(true);
      // The result should be an array (even if empty from DB)
      if (result.length > 0) {
        expect(result[0]).toHaveProperty("timeControl");
        expect(result[0]).toHaveProperty("currentRating");
        expect(result[0]).toHaveProperty("peakRating");
      }
    });
  });

  describe("interests.getAll", () => {
    it("returns an array of interests", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.interests.getAll();

      expect(Array.isArray(result)).toBe(true);
      // The result should be an array (even if empty from DB)
      if (result.length > 0) {
        expect(result[0]).toHaveProperty("category");
        expect(result[0]).toHaveProperty("title");
      }
    });
  });

  describe("interests.getSocial", () => {
    it("returns an array of social profiles", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.interests.getSocial();

      expect(Array.isArray(result)).toBe(true);
      // The result should be an array (even if empty from DB)
      if (result.length > 0) {
        expect(result[0]).toHaveProperty("platform");
        expect(result[0]).toHaveProperty("profileUrl");
      }
    });
  });

  describe("interests endpoints are public", () => {
    it("all endpoints should be accessible without authentication", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      // These should all work without throwing auth errors
      await expect(caller.interests.getRunning()).resolves.toBeDefined();
      await expect(caller.interests.getChess()).resolves.toBeDefined();
      await expect(caller.interests.getAll()).resolves.toBeDefined();
      await expect(caller.interests.getSocial()).resolves.toBeDefined();
    });
  });
});
