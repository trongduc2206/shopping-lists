import { sql } from "../database/database.js";

const create = async (name, active) => {
    await sql`INSERT INTO shopping_lists (name, active) VALUES (${ name }, ${ active })`;
  };
  
  const getAllActiveShoppingList = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
  };

  const deactivateShoppingList = async (id) => {
    await sql`UPDATE shopping_lists SET active = false WHERE id = ${ id }`;
  }

  const getShoppingListById = async (id) => {
    const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${ id }`;
    if (rows && rows.length > 0) {
        return rows[0];
    }
    return { id: 0, name: "Unknown" };
  }

export { create, getAllActiveShoppingList, deactivateShoppingList, getShoppingListById };