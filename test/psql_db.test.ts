import { expect } from "chai";
import { DB } from "../src/model/psql_db"; // Replace with the actual path to your DB class

describe("DB", () => {
  let db: DB;

  beforeEach(() => {
    db = new DB();
  });

  it("should save a snippet", () => {
    const snippetText = "This is a test snippet";
    db.SaveSnippet(snippetText);
    //asert
  });

  it("should fetch a snippet", () => {
    const snippetText = "This is a test snippet";
    const snippetId = "1";
    db.SaveSnippet(snippetText);

    const fetchedSnippet = db.FetchSnippet(snippetId);
    expect(fetchedSnippet).to.equal(snippetText);
  });

  it("should delete a snippet", () => {
    const snippetText = "This is a test snippet";
    const snippetId = "1";
    db.SaveSnippet(snippetText);

    db.DeleteSnippet(snippetId);
    const fetchedSnippet = db.FetchSnippet(snippetId);
    expect(fetchedSnippet).to.be.undefined;
  });

  it("should update a snippet", () => {
    const initialSnippetText = "This is an initial snippet";
    const updatedSnippetText = "This is an updated snippet";
    const snippetId = "1";
    db.SaveSnippet(initialSnippetText);
    db.UpdateSnippet(snippetId, updatedSnippetText);
    const fetchedSnippet = db.FetchSnippet(snippetId);
    expect(fetchedSnippet).to.equal(updatedSnippetText);
  });
});
