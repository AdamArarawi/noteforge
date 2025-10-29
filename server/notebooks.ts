"use server";

import { db } from "@/db/drizzle";
import { InsertNotebook, notebooks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";

export const getNotebooks = async () => {
  "use cache: private";
  cacheLife("hours");
  console.log("getNotebooks");

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user.id;
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }
    cacheTag(`notebooks-${userId}`);

    const notebooksByUser = await db.query.notebooks.findMany({
      where: eq(notebooks.userId, userId),
      with: {
        notes: true,
      },
    });

    return {
      success: true,
      notebooksByUser,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message,
    };
  }
};

export const createNotebook = async (data: InsertNotebook) => {
  revalidateTag(`notebooks-${data.userId}`, "max");
  try {
    await db.insert(notebooks).values({ ...data });

    return {
      success: true,
      message: "Notebook created successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message,
    };
  }
};

export const getNoteBookById = async (id: string) => {
  try {
    const notebook = await db.query.notebooks.findFirst({
      where: eq(notebooks.id, id),
      with: {
        notes: true,
      },
    });
    return {
      success: true,
      notebook,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message,
    };
  }
};

export const updateNotebook = async (id: string, data: InsertNotebook) => {
  revalidateTag(`notebooks-${data.userId}`, "max");
  try {
    await db.update(notebooks).set(data).where(eq(notebooks.id, id));

    return {
      success: true,
      message: "Notebook updated successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message,
    };
  }
};

export const deleteNotebook = async (id: string) => {
  try {
    const notebook = await db
      .delete(notebooks)
      .where(eq(notebooks.id, id))
      .returning();
    revalidateTag(`notebooks-${notebook[0].userId}`, "max");
    return {
      success: true,
      message: "Notebook deleted successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message,
    };
  }
};
