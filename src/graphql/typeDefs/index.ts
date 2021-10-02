import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { print } from 'graphql'
// import fs from 'fs'

const typedefsArray = loadFilesSync(`${__dirname}/*.graphql`, {
  ignoreIndex: true,
  extensions: ['graphql'],
})

const mergedTypeDefs = mergeTypeDefs(typedefsArray)

const printedTypeDefs = print(mergedTypeDefs)

// print typeDefs to generate a typescript file
// fs.writeFileSync('src/graphql/generated/schema.graphql', printedTypeDefs)

export { printedTypeDefs as typeDefs }
