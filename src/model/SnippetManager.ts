import { db } from "src/controller";
import { Snippet } from "./Snippet";
import { DB } from "./psql_db";

export interface SnippetManagerInterface {
  SaveSnippet(text: string): Promise<void>;
  FetchSnippet(snippet_id: string): Promise<Snippet>;
  DeleteSnippet(snippet_id: string): Promise<void>;
  UpdateSnippet(snippet: Snippet): Promise<void>;
}

export class SnippetManager implements SnippetManagerInterface {
  private db: DB;
  constructor() {
    this.db = db;
  }
  public async SaveSnippet(text: string): Promise<void> {
    try {
      await this.db.SaveSnippet(text);
    } catch (error) {}
  }
  public async FetchSnippet(snippet_id: string): Promise<Snippet> {
    try {
      const snippet: Snippet = await this.db.FetchSnippet(snippet_id);
      if (snippet) {
        return snippet;
      } else {
        throw new Error("Snippet_Not_Found");
      }
    } catch (error) {
      throw error;
    }
  }
  public async DeleteSnippet(snippet_id: string): Promise<void> {
    try {
      await this.db.DeleteSnippet(snippet_id);
    } catch (error) {}
  }
  public async UpdateSnippet(snippet: Snippet): Promise<void> {
    try {
      await this.db.UpdateSnippet(snippet);
    } catch (error) {}
  }
}
