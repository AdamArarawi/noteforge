"use server";

import { db } from "@/db/drizzle";
import { type InsertNote, notes } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createNote = async (data: InsertNote) => {
  try {
    await db.insert(notes).values({ ...data });

    return {
      success: true,
      message: "Note created successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message,
    };
  }
};

export const getNoteById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const note = await db.query.notes.findFirst({
      where: eq(notes.id, id),
      with: {
        notebook: true,
      },
    });

    return {
      success: true,
      note,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message,
    };
  }
};

export const updateNote = async (id: string, data: Partial<InsertNote>) => {
  try {
    await db.update(notes).set(data).where(eq(notes.id, id));

    return {
      success: true,
      message: "Note updated successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message,
    };
  }
};

export const deleteNote = async (id: string) => {
  try {
    await db.delete(notes).where(eq(notes.id, id));
    return {
      success: true,
      message: "Note deleted successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message,
    };
  }
};
