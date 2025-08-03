"use server"

import { signIn } from "@/lib/auth/config"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { permanentRedirect } from 'next/navigation'
const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export async function signUpAction(formData: FormData) {
  let success = false
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    const validatedData = signUpSchema.parse(rawData)

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, validatedData.email)).limit(1)

    if (existingUser.length > 0) {
      return { error: "User with this email already exists" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Create user
    await db.insert(users).values({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
    })

    // Sign in the user
    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    })
    success = true
  } catch (error) {
    success = false
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: "Something went wrong. Please try again." }
  } finally {
    if (success) {
      permanentRedirect('/dashboard')
    }
  }
}

export async function signInAction(formData: FormData) {
  let success = false
  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    const validatedData = signInSchema.parse(rawData)


    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    })
    success = true
  } catch (error) {
    success = false
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    console.error("Zod Error:", error);
    return { error: "Invalid credentials. Please try again." }
  } finally {
    if (success) {
      permanentRedirect('/dashboard')
    }
  }
}

