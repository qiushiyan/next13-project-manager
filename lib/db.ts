import { Prisma, PrismaClient, User } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

const projectWithCards = Prisma.validator<Prisma.ProjectArgs>()({
  include: {
    tasks: true,
  },
});

const findUserProjects = (uid: string) => {
  return Prisma.validator<Prisma.ProjectWhereInput>()({
    ownerId: uid,
  });
};

export { prisma, projectWithCards, findUserProjects };
