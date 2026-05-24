import { Router } from 'express';
import { createItem, getItems, getItemById, updateItemById, deleteItem } from '../controllers/itemController.js';
const router = Router();
router.get("/", getItems);
router.get("/:id", getItemById);
router.post("/", createItem);
router.put("/:id", updateItemById);
router.delete("/:id", deleteItem);
export default router;
//# sourceMappingURL=itemRoutes.js.map