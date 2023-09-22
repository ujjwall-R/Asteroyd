import { assert, expect } from "chai";
import { DB } from "../src/model/psql_db";
import { Snippet } from "../src/model/Snippet";

class DBTest extends DB {
  constructor() {
    super();
  }

  async connectToDatabase() {
    it("should connect to the database", async () => {
      expect(async () => {
        await this.connect();
      }).to.not.throw();
    });
  }

  async saveSnippetTenTimes() {
    it("should save a snippet 10 times", async () => {
      const snippetText = "This is a test snippet1";
      let cnt: number = 10;
      while (cnt--)
        await expect(async () => {
          await this.SaveSnippet(snippetText);
        }).to.not.throw();
    });
  }

  async saveSnippet() {
    it("should save a snippet", async () => {
      const snippetText = "This is a test snippet1";
      await expect(async () => {
        await this.SaveSnippet(snippetText);
      }).to.not.throw();
    });
  }

  async fetchSnippet() {
    it("should fetch a snippet", async () => {
      const snippetId: String = await this.getMaximumIdOfSnippet();
      const fetchedSnippet: Snippet = await this.FetchSnippet(snippetId);
      assert.ok(fetchedSnippet);
      assert.strictEqual(fetchedSnippet.id.toString(), snippetId.toString());
    });
  }

  async deleteSnippet() {
    it("should delete a snippet", async () => {
      const snippetIdToDelete: String = await this.getMaximumIdOfSnippet();
      const initialSnippet = await this.FetchSnippet(snippetIdToDelete);
      assert.isDefined(initialSnippet, "Snippet should exist before deletion");
      try {
        await this.DeleteSnippet(snippetIdToDelete);
        const _ = await this.FetchSnippet(snippetIdToDelete);
      } catch (error: unknown) {
        if (error instanceof Error)
          assert.strictEqual(
            error.message,
            "no_snippet_found",
            "Error message should indicate non-existent snippet"
          );
      }
    });
  }

  async updateSnippet() {
    it("should update a snippet", async () => {
      const snippetId: String = await this.getMaximumIdOfSnippet();
      const updatedSnippetText: String = "This is an updated snippet";
      const snippet: Snippet = { id: snippetId, code: updatedSnippetText };
      await this.UpdateSnippet(snippet);
      const fetchedSnippet = await this.FetchSnippet(snippetId);
      expect(fetchedSnippet.code).to.equal(updatedSnippetText);
    });
  }

  async disconnectFromDatabase() {
    it("should disconnect from the database", async () => {
      await expect(async () => {
        await this.disconnect();
      }).to.not.throw();
    });
  }

  async getMaximumIdOfSnippet(): Promise<String> {
    const selectMaxIdSQL = "SELECT MAX(id) as id FROM snippets";

    try {
      const row = await new Promise<Snippet>((resolve, reject) => {
        this.db.get(selectMaxIdSQL, (err: Error | null, row: Snippet) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });

      if (row) {
        const maxId: String = row.id;
        return maxId;
      } else {
        throw new Error("no_snippet_found"); // Throw an error if no snippet is found
      }
    } catch (err) {
      throw err;
    }
  }
}

describe("DB", async () => {
  const dbTest = await new DBTest();

  await dbTest.connectToDatabase();
  await dbTest.saveSnippetTenTimes();
  await dbTest.fetchSnippet();
  await dbTest.deleteSnippet();
  await dbTest.updateSnippet();
  await dbTest.disconnectFromDatabase();
});
