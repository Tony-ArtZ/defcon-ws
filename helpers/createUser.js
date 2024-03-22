import prisma from "../utils/prisma.js";
export const createUser = async (userName) => {
  try {
    const data = await prisma.user.create({
      data: {
        userName,
        flagsCollected: 0,
      },
    });
    return { success: true, data };
  } catch (error) {
    return { error, success: false };
  }
};
