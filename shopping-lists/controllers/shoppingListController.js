import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as shoppingListService from "../services/shoppingListService.js";

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

const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
  
    await shoppingListService.create(name, true);
  
    return redirectTo("/lists");
};
  
const viewLists = async (request) => {
    const data = {
      lists: await shoppingListService.getAllActiveShoppingList(),
    };
  
    return new Response(await renderFile("shoppingList.eta", data), responseDetails);
};

  const deactivateShoppingList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await shoppingListService.deactivateShoppingList(urlParts[2]);

    return redirectTo("/lists");
  }

  export {addList, viewLists, deactivateShoppingList };