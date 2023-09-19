import { assert, expect } from "chai";
import { DB } from "../src/model/psql_db"; // Replace with the actual path to your DB class
import { Snippet } from "../src/model/Snippet";

describe("DB", () => {
  let db: DB;

  it("should connect to the database", () => {
    expect(async () => {
      db = new DB();
      await db.connect();
    }).to.not.throw();
  });

  it("should save a snippet", () => {
    const snippetText = "This is a test snippet1";
    db.SaveSnippet(snippetText);
  });

  it("should fetch a snippet", async () => {
    const snippetId = "1";
    const fetchedSnippet = await db.FetchSnippet(snippetId);
    assert.ok(fetchedSnippet);
    assert.strictEqual(fetchedSnippet.id, snippetId);
  });

  it("should delete a snippet", async () => {
    const snippetIdToDelete = "1";
    const initialSnippet = await db.FetchSnippet(snippetIdToDelete);
    assert.isDefined(initialSnippet, "Snippet should exist before deletion");
    try {
      await db.DeleteSnippet(snippetIdToDelete);
      const _ = await db.FetchSnippet(snippetIdToDelete);
    } catch (error) {
      assert.strictEqual(
        error.message,
        "no_snippet_found",
        "Error message should indicate non-existent snippet"
      );
    }
  });

  it("should update a snippet", () => {
    const initialSnippetText = "This is an initial snippet";
    const updatedSnippetText = "This is an updated snippet";
    const snippetId = "1";
    db.UpdateSnippet(snippetId, updatedSnippetText);
    const fetchedSnippet = db.FetchSnippet(snippetId);
    expect(fetchedSnippet).to.equal(updatedSnippetText);
  });

  it("should disconnect from the database", () => {
    expect(async () => {
      await db.disconnect();
    }).to.not.throw();
  });
});
