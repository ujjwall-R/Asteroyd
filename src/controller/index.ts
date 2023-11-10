import { DB } from "src/model/psql_db";

const __init__ = (): DB => {
  const db: DB = new DB();
  return db;
};

export const db: DB = __init__();
