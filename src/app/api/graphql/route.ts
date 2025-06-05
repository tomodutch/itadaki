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

// https://github.com/apollo-server-integrations/apollo-server-integration-next/issues/229#issuecomment-2588520133
export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}