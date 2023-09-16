import { Client, Pool } from "pg";

import { Snippet } from "./Snippet";

export class DB {
  private client: Client | undefined;
  private pool: Pool;

  public constructor() {
    this.pool = new Pool({
      user: "your_username",
      host: "your_host",
      database: "your_database",
      password: "your_password",
      port: 5432, // Default PostgreSQL port
    });
  }

  async connect() {
    try {
    } catch (error) {}
  }

  async disconnect() {
    try {
    } catch (error) {}
  }

  public SaveSnippet(text: string) {}

  public FetchSnippet(snippet_id: string): Snippet {
    const snip: Snippet = { id: "", code: "" };
    return snip;
  }

  public DeleteSnippet(snippet_id: string) {}

  public UpdateSnippet(snippet_id: string, updated_snippet: string) {}
}
