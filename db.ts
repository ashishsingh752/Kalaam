// Singleton prisma client

// this is  to avoid the hot reloading of the file
// when we see the comman pattern again and again then  whenever we create the database connections
// we only instanciate the prisma client only once and if the istance of it already exist then don't instanciate 


import { PrismaClient } from '@prisma/client'

console.log("inside the file")
const prismaClientSingleton = () => {
    console.log("instance get created")
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma