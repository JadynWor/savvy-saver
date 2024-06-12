/* eslint-disable init-declarations -- disabled */
/* eslint-disable no-unused-vars -- disabled */

import type { PrismaClient } from "@prisma/client";

declare global {
    const prisma: PrismaClient;
}
