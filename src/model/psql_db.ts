import { Snippet } from "./Snippet";

export class DB {
  public constructor() {}

  public SaveSnippet(text: string) {}

  public FetchSnippet(snippet_id: string): Snippet {
    const snip: Snippet = { id: "", code: "" };
    return snip;
  }

  public DeleteSnippet(snippet_id: string) {}

  public UpdateSnippet(snippet_id: string, updated_snippet: string) {}
}
