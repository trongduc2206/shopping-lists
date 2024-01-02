import { postgres } from "../deps.js";
let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = postgres({
    host: Deno.env.get("PGHOST"),
    database: Deno.env.get("PGDATABASE"),
    username: Deno.env.get("PGUSER"),
    password: Deno.env.get("PGPASSWORD"),
    port: Deno.env.get("PGPORT"),
  });
} 

export { sql };