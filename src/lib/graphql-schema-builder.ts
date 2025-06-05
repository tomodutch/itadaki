import SchemaBuilder from '@pothos/core';
import prisma from '@/lib/prisma';
import PrismaPlugin from '@pothos/plugin-prisma';
import { PrismaObjectFieldBuilder } from '@pothos/plugin-prisma';
// This is the default location for the generator, but this can be
// customized as described above.
// Using a type only import will help avoid issues with undeclared
// exports in esm mode
import type PrismaTypes from '@/db/generated/pothos';

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    // descriptions can be omitted by setting description to false
    // exposeDescriptions: false | { models: boolean, fields: boolean },
    // use where clause from prismaRelatedConnection for totalCount (defaults to true)
    filterConnectionTotalCount: true,
    // warn when not using a query parameter correctly
    onUnusedQuery: process.env.NODE_ENV === 'production' ? null : 'warn',
  },
});

builder.prismaObject('User', {
  fields: (t: PrismaObjectFieldBuilder<PrismaTypes, "User">) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name', { nullable: true }),
    image: t.exposeString('image', { nullable: true }),
  }),
});

builder.queryField('userById', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, _root, args) =>
      prisma.user.findUnique({
        ...query,
        where: { id: args.id },
      }),
  }),
);

builder.mutationField('createUser', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      email: t.arg.string({ required: true }),
      name: t.arg.string({ required: false }),
      image: t.arg.string({ required: false }),
    },
    resolve: async (query, _root, args) => {
      return prisma.user.create({
        ...query,
        data: {
          email: args.email,
          name: args.name ?? null,
          image: args.image ?? null,
        },
      });
    },
  })
);

// Add explicit root Query type declaration
builder.queryType({});
builder.mutationType({});

export default builder;