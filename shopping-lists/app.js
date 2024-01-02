import { serve } from "./deps.js";
import { configure } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as shoppingListController from "./controllers/shoppingListController.js";
import * as mainPageController from "./controllers/mainPageController.js";
import * as shoppingListSpecificController from "./controllers/shoppingListSpecificController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
      return await mainPageController.viewMainPage(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await shoppingListController.viewLists(request);
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await shoppingListController.addList(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
    return await shoppingListSpecificController.viewItems(request);
  } else if (url.pathname.match("lists/[0-9]+/deactivate") && request.method === "POST") {
    return await shoppingListController.deactivateShoppingList(request);
  } else if (url.pathname.match("lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
    return await shoppingListSpecificController.markCollected(request);
  } else if (url.pathname.match("lists/[0-9]+/items") && request.method === "POST") {
    return await shoppingListSpecificController.addItem(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });
