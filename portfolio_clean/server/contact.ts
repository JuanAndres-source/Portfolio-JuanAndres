import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";

// Validation schema for contact form
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const contactRouter = router({
  /**
   * Send a contact message
   * Validates the form data and sends a notification to the owner
   */
  sendMessage: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ input }) => {
      try {
        // Send notification to owner with contact details
        const success = await notifyOwner({
          title: `New Contact Message from ${input.name}`,
          content: `
**From:** ${input.name}
**Email:** ${input.email}
**Subject:** ${input.subject}

**Message:**
${input.message}

---
Reply to: ${input.email}
          `,
        });

        if (!success) {
          throw new Error("Failed to send notification");
        }

        return {
          success: true,
          message: "Your message has been sent successfully!",
        };
      } catch (error) {
        console.error("Contact form error:", error);
        throw new Error("Failed to send message. Please try again later.");
      }
    }),
});
