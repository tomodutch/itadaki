import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import schemaBuilder from "@/lib/graphql-schema-builder";

const server = new ApolloServer({
    schema: schemaBuilder.toSchema()
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({ req }),
});

export { handler as GET, handler as POST };