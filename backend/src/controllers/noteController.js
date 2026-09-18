import Note from "../models/Note.js";

// Create Note
export const createNote = async (req, res) => {
  try {
    const { title, content, folder, tags } = req.body;

    const note = await Note.create({
      user: req.userId,
      title: title || "Untitled Note",
      content: content || "",
      folder: folder || "Engineering",
      tags: tags || []
    });

    res.status(201).json({
      success: true,
      note
    });
  } catch (error) {
    console.error("Create Note Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Get All Notes
export const getNotes = async (req, res) => {
  try {
    const { filter, folder } = req.query;

    const query = {
      user: req.userId
    };

    if (filter === "trash") {
      query.isTrash = true;
    } else {
      query.isTrash = false;
    }

    if (filter === "favorites") {
      query.isFavorite = true;
    }

    if (filter === "pinned") {
      query.isPinned = true;
    }

    if (folder) {
      query.folder = folder;
    }

    const notes = await Note.find(query).sort({
      updatedAt: -1
    });

    res.status(200).json({
      success: true,
      notes
    });
  } catch (error) {
    console.error("Get Notes Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Get Single Note
export const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    res.status(200).json({
      success: true,
      note
    });
  } catch (error) {
    console.error("Get Note Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Update Note
export const updateNote = async (req, res) => {
  try {
    const { title, content, folder, tags } = req.body;

    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId
      },
      {
        title,
        content,
        folder,
        tags
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    res.status(200).json({
      success: true,
      note
    });
  } catch (error) {
    console.error("Update Note Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Delete Note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully"
    });
  } catch (error) {
    console.error("Delete Note Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
// Pin / Unpin Note
export const togglePin = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    note.isPinned = !note.isPinned;
    await note.save();

    res.status(200).json({
      success: true,
      note
    });
  } catch (error) {
    console.error("Toggle Pin Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Favorite / Unfavorite Note
export const toggleFavorite = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    note.isFavorite = !note.isFavorite;
    await note.save();

    res.status(200).json({
      success: true,
      note
    });
  } catch (error) {
    console.error("Toggle Favorite Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Move to Trash
export const moveToTrash = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    note.isTrash = true;
    await note.save();

    res.status(200).json({
      success: true,
      message: "Note moved to trash",
      note
    });
  } catch (error) {
    console.error("Move Trash Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Restore Note
export const restoreNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    note.isTrash = false;
    await note.save();

    res.status(200).json({
      success: true,
      message: "Note restored",
      note
    });
  } catch (error) {
    console.error("Restore Note Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Permanently Delete Note
export const permanentlyDeleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
      isTrash: true
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Trashed note not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Note permanently deleted"
    });
  } catch (error) {
    console.error("Permanent Delete Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// Duplicate Note
export const duplicateNote = async (req, res) => {
  try {
    const originalNote = await Note.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!originalNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    const duplicatedNote = await Note.create({
      user: req.userId,
      title: `${originalNote.title} Copy`,
      content: originalNote.content,
      folder: originalNote.folder,
      tags: originalNote.tags,
      isPinned: false,
      isFavorite: false,
      isTrash: false
    });

    res.status(201).json({
      success: true,
      note: duplicatedNote
    });
  } catch (error) {
    console.error("Duplicate Note Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

