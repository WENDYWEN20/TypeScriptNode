import type { Request, Response, NextFunction } from "express";
import { items } from "../models/items.js";
import type { Item } from "../models/items.js";

const parseRequestId = (id: unknown): number | null => {
  if (typeof id !== "string") {
    return null;
  }

  const parsedId = parseInt(id, 10);
  return Number.isNaN(parsedId) ? null : parsedId;
};

export const createItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const newItem: Item = { id: Date.now(), name };
    items.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};
//read all items
export const getItems = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(items);
  } catch (error) {
    next(error);
  }
};
//read single item
export const getItemById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseRequestId(req.params.id);
    if (id === null) {
      res.status(400).json({ message: "Invalid item id" });
      return;
    }

    const item = items.find((i) => i.id === id);
    if (!item) {
      res.status(404).json({ message: "Item not found" });
      return;
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};
//update an item
export const updateItemById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseRequestId(req.params.id);
    if (id === null) {
      res.status(400).json({ message: "Invalid item id" });
      return;
    }

    const { name } = req.body;
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      res.status(404).json({ messsage: "Item not found" });
      return;
    }

    const item = items[itemIndex];
    if (!item) {
      res.status(404).json({ message: "Item not found" });
      return;
    }

    item.name = name;
    res.json(item);
  } catch (error) {
    next(error);
  }
};

//delete an item
export const deleteItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseRequestId(req.params.id);
    if (id === null) {
      res.status(400).json({ message: "Invalid item id" });
      return;
    }

    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      res.status(404).json({ message: "Item not found" });
      return;
    }
    const [deletedItem] = items.splice(itemIndex, 1);
    res.json(deletedItem);
  } catch (error) {
    next(error);
  }
};
