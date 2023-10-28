export namespace CustomExceptions {
  export class ExampleException extends Error {
    constructor(message: string) {
      super(message);
      this.name = "Example Exception";
    }
  }
}
