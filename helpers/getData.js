import prisma from "../utils/prisma.js";

export const getData = async () => {
  try {
    const data = await prisma.user.findMany({
      orderBy: {
        flagsCollected: "desc",
      },
    });
    return { success: true, data };
  } catch (error) {
    return { error, success: false };
  }
};
