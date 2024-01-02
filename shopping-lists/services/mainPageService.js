import { sql } from "../database/database.js";

const getNumOfShoppingList = async () =>  {
    const rows = await sql`SELECT count(*) as count FROM shopping_lists`;
    return rows[0].count;
}

const getNumOfShoppingListItem = async () =>  {
    const rows = await sql`SELECT count(*) as count FROM shopping_list_items`;
    return rows[0].count;
}

export { getNumOfShoppingList, getNumOfShoppingListItem };
