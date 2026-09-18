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
    const notes = await Note.find({
      user: req.userId
    }).sort({ updatedAt: -1 });

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