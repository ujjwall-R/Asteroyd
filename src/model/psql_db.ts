const sqlite3 = require("sqlite3").verbose();

import { sqlite3 } from "sqlite3";
import { Snippet } from "./Snippet";

export class DB {
  private db: sqlite3;
  private db_name: string;

  public constructor() {
    this.db_name = "sippets.db";
    this.db = new sqlite3.Database(this.db_name);
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
