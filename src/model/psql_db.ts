const sqlite3 = require("sqlite3");

import { sqlite3 } from "sqlite3";
import { Snippet } from "./Snippet";

export class DB {
  protected db;
  private db_name: String;

  public constructor() {
    this.db_name = "snippets.db";
    this.db = new sqlite3.Database(this.db_name);
    this.createTable();
  }

  async connect() {
    try {
      await this.db.connect();
    } catch (error) {}
  }

  async disconnect() {
    try {
      await this.db.close();
    } catch (error) {}
  }

  private async createTable() {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS snippets (
        id INTEGER PRIMARY KEY,
        code TEXT
      )
    `;
    try {
      await this.db.exec(createTableSQL);
    } catch (error) {
      throw error;
    }
  }

  public SaveSnippet(text: String): Promise<void> {
    const insertSQL = "INSERT INTO snippets (code) VALUES (?)";
    return new Promise<void>((resolve, reject) => {
      this.db.run(insertSQL, [text], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public async FetchSnippet(snippet_id: String): Promise<Snippet> {
    const selectSQL = "SELECT * FROM snippets WHERE id = ?";
    try {
      const row = await new Promise<Snippet>((resolve, reject) => {
        this.db.get(selectSQL, [snippet_id], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });

      if (row) {
        const snippet: Snippet = { id: row.id.toString(), code: row.code };
        return snippet;
      } else {
        throw new Error("no_snippet_found"); // Throw an error if no snippet is found
      }
    } catch (err) {
      throw err;
    }
  }
  public async DeleteSnippet(snippet_id: String): Promise<void> {
    const deleteSQL = "DELETE FROM snippets WHERE id = ?";

    try {
      await new Promise<void>((resolve, reject) => {
        this.db.run(deleteSQL, [snippet_id], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      throw new Error("snippet_deletion_error");
    }
  }

  public async UpdateSnippet(snippet: Snippet): Promise<void> {
    const updateSQL = "UPDATE snippets SET code = ? WHERE id = ?";
    const { id, code } = snippet;
    try {
      await new Promise<void>((resolve, reject) => {
        this.db.run(updateSQL, [code, id], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      throw new Error("snippet_updation_error");
    }
  }
}
