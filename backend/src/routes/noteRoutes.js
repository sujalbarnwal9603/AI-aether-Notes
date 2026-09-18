import express from "express";

import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  togglePin,
  toggleFavorite,
  moveToTrash,
  restoreNote,
  permanentlyDeleteNote,
  duplicateNote
} from "../controllers/noteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createNote);
router.get("/", getNotes);
router.get("/:id", getNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);


router.patch("/:id/pin", togglePin);
router.patch("/:id/favorite", toggleFavorite);
router.patch("/:id/trash", moveToTrash);
router.patch("/:id/restore", restoreNote);

router.delete("/:id/permanent", permanentlyDeleteNote);
router.post("/:id/duplicate", duplicateNote);

export default router;