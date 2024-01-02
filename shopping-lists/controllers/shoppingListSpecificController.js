import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as shoppingListSpecificService from "../services/shoppingListSpecificService.js";
import { getShoppingListById } from "../services/shoppingListService.js"

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
    return new Response(`Redirecting to ${path}.`, {
      status: 303,
      headers: {
        "Location": path,
      },
    });
};

const addItem = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const shoppingListId = urlParts[2];
    await shoppingListSpecificService.create( shoppingListId, name);
  
    return redirectTo(`/lists/${shoppingListId}` );
};

const viewItems = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const shoppingListId = urlParts[2];
    const shoppingList = await getShoppingListById(shoppingListId);
    const data = {
      id: shoppingListId,
      name: shoppingList.name,
      items: await shoppingListSpecificService.getAllItems(shoppingListId),
    };
    
    return new Response(await renderFile("shoppingListSpecific.eta", data), responseDetails);
};

const markCollected = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const shoppingListId = urlParts[2];
    const itemId = urlParts[4];
    await shoppingListSpecificService.markCollected(itemId);

    return redirectTo(`/lists/${shoppingListId}` );
}

export { addItem, viewItems, markCollected };