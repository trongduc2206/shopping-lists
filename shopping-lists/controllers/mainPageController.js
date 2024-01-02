import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as mainPageService from "../services/mainPageService.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };

  const viewMainPage = async (request) => {
    const data = {
        shoppingListCount: await mainPageService.getNumOfShoppingList(),
        shoppingListItemCount: await mainPageService.getNumOfShoppingListItem()
    }
    return new Response(await renderFile("mainPage.eta", data), responseDetails);
  };

export {viewMainPage};