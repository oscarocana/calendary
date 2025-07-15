import { defineConfig } from "drizzle-kit"

// stores the database URL from environment variables
const databaseUrl = process.env.DATABASE_URL

// If the database URL is not defined, an error is thrown to prevent misconfiguration
if (!databaseUrl) {
  throw new Error("❌ DATABASE_URL is not defined in environment variables.")
}

// Exports the Drizzle config using defineConfig helper
export default defineConfig({
  // Path to the schema definitions
  schema: "./drizzle/schema.ts",

  // where Drizzle will output migration files
  out: "./drizzle/migrations",

  //  Specifies which SQL dialect is being used
  dialect: "postgresql",

  //  Enables strict mode which enforces stricter validation and type-safety
  strict: true,

  // Enables verbose logging to get more information during CLI actions
  verbose: true,

  // Passes in our database credentials
  dbCredentials: {
    url: databaseUrl,
  },
})