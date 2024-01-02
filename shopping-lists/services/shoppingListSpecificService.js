import { sql } from "../database/database.js";

const create = async (shoppingListId, name) => {
    await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${ shoppingListId }, ${ name })`;
};

const getAllItems = async (shopping_list_id) => {
    return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${ shopping_list_id } ORDER BY collected ASC, name ASC`;
};

const markCollected = async (id) => {
    await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${ id }`;
}

export { create, getAllItems, markCollected };