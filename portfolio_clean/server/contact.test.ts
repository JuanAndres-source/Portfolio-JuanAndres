import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notifyOwner function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

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

describe("contact router", () => {
  describe("contact.sendMessage", () => {
    it("accepts valid contact form data", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const validData = {
        name: "John Doe",
        email: "john@example.com",
        subject: "Job Opportunity",
        message: "I would like to discuss a potential opportunity with you.",
      };

      const result = await caller.contact.sendMessage(validData);

      expect(result).toHaveProperty("success");
      expect(result.success).toBe(true);
    });

    it("rejects invalid email", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const invalidData = {
        name: "John Doe",
        email: "invalid-email",
        subject: "Job Opportunity",
        message: "I would like to discuss a potential opportunity with you.",
      };

      await expect(caller.contact.sendMessage(invalidData as any)).rejects.toThrow();
    });

    it("rejects short name", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const invalidData = {
        name: "J",
        email: "john@example.com",
        subject: "Job Opportunity",
        message: "I would like to discuss a potential opportunity with you.",
      };

      await expect(caller.contact.sendMessage(invalidData as any)).rejects.toThrow();
    });

    it("rejects short subject", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        subject: "Hi",
        message: "I would like to discuss a potential opportunity with you.",
      };

      await expect(caller.contact.sendMessage(invalidData as any)).rejects.toThrow();
    });

    it("rejects short message", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        subject: "Job Opportunity",
        message: "Short",
      };

      await expect(caller.contact.sendMessage(invalidData as any)).rejects.toThrow();
    });

    it("is publicly accessible", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const validData = {
        name: "John Doe",
        email: "john@example.com",
        subject: "Job Opportunity",
        message: "I would like to discuss a potential opportunity with you.",
      };

      // Should not throw auth error
      await expect(caller.contact.sendMessage(validData)).resolves.toBeDefined();
    });
  });
});
