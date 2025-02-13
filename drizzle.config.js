import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials:{
    url:'postgresql://ai-mock-interview_owner:Yp0BtWiZDch7@ep-muddy-thunder-a5mf31y1.us-east-2.aws.neon.tech/ai-mock-interview?sslmode=require'
  }
});