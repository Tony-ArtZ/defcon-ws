import prisma from "../utils/prisma.js";

export const updateUser = async (userId, flags) => {
  try {
    const update = await prisma.user.update({
      data: {
        flagsCollected: flags,
      },
      where: {
        id: userId,
      },
    });
    return { success: true };
  } catch (error) {
    return { error, success: false };
  }
};
