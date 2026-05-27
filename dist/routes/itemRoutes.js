import { Router } from 'express';
import { createItem, getItems, getItemById, updateItemById, deleteItem } from '../controllers/itemController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
const router = Router();
router.get("/", getItems);
router.get("/:id", getItemById);
router.post("/", requireAuth, createItem);
router.put("/:id", requireAuth, updateItemById);
router.delete("/:id", requireAuth, deleteItem);
export default router;
//# sourceMappingURL=itemRoutes.js.map