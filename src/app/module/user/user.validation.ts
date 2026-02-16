import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createDoctorZodSchema = z.object({
    password: z.string("Password is required").min(6, "Password must be at least 6 chracter").max(20, "Password max 20 chracter"),
    doctor: z.object({
        name: z.string("Name is Required").min(5, "Name must be at least 5 chracter").max(30, "Name must be bellow under 30 chracter"),
        email: z.email("Invalid email address"),
        contactNumber: z.string("Contact number is required").min(11, "Contact number must be 11 chracter").max(14, "Contact number can be maximum 14 chracter"),
        address: z.string("Address is required").min(10, "Address must be at least 10 chracter").max(100, "Address can be maximum 100 chracter").optional(),
        registrationNumber: z.string("Registration number is required"),
        experience: z.int("Experience is required").nonnegative("Experience must be a non-negative integer").optional(),
        gender: z.enum([Gender.MALE, Gender.FEMALE], "Gender is required"),
        appointmentFee: z.number("Appointment fee is required").nonnegative("Appointment fee must be a non-negative number"),
        qualification: z.string("Qualification is required").min(5, "Qualification must be at least 5 chracter").max(50, "Qualification can be maximum 50 chracter"),
        designation: z.string("Designation is required").min(5, "Designation must be at least 5 chracter").max(50, "Designation can be maximum 50 chracter"),
        currentlyWorkingPlace: z.string("Currently working place is required").min(5, "Currently working place must be at least 5 chracter").max(50, "Currently working place can be maximum 50 chracter").optional(),
    }),
    specialties: z.array(z.uuid(), "Specialties is required").min(1, "At least one specialty is required"),
})

