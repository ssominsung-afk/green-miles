import { z } from "zod";

// Standard Order Request (replaces Quote)
export const orderRequestSchema = z.object({
    name: z.string().min(2, "Name is required"),
    company: z.string().min(2, "Company name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Valid phone number is required"),
    zip: z.string().min(5, "ZIP code is required"),
    palletType: z.enum(["New 48x40", "Recycled A", "Recycled B", "Other"]),
    quantity: z.string().min(1, "Quantity is required"),
    frequency: z.enum(["One-time", "Weekly", "Monthly"]),
    deliveryMode: z.enum(["Pickup", "Delivery"]),
    deliveryAddress: z.string().optional(),
    notes: z.string().optional(),
});

// Custom Pallet Request (New)
export const customRequestSchema = z.object({
    name: z.string().min(2, "Name is required"),
    company: z.string().min(2, "Company name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Valid phone number is required"),
    zip: z.string().min(5, "ZIP code is required"),
    dimensions: z.string().min(3, "LxWxH is required"),
    loadRating: z.string().optional(),
    woodType: z.string().optional(),
    designType: z.enum(["Stringer", "Block", "Not sure"]),
    heatTreated: z.enum(["Yes", "No", "Not sure"]),
    quantity: z.string().min(1, "Quantity is required"),
    notes: z.string().optional(),
    // Individual file fields (optional/legacy)
    fileData: z.string().optional(),
    fileName: z.string().optional(),
    fileType: z.string().optional(),
    // New array structure for Apps Script
    files: z.array(z.object({
        name: z.string(),
        mimeType: z.string(),
        base64: z.string()
    })).optional(),
});

export type OrderRequestData = z.infer<typeof orderRequestSchema>;
export type CustomRequestData = z.infer<typeof customRequestSchema>;
