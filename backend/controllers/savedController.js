import SavedScheme from "../models/SavedScheme.js";
import Activity from "../models/Activity.js";

export const saveScheme = async (req, res) => {
  try {
    const { schemeId, schemeType } = req.body;

    const exists = await SavedScheme.findOne({
      user: req.user._id,
      schemeId,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Already Saved",
      });
    }

    const saved = await SavedScheme.create({
      user: req.user._id,
      schemeId,
      schemeType,
    });

    await Activity.create({
      user: req.user._id,
      title: "Saved Scheme",
      description: "A scheme was added to favourites.",
      type: "save",
    });

    res.json({
      success: true,
      saved,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Save Failed",
    });
  }
};

export const removeSaved = async (req, res) => {
  try {
    await SavedScheme.findOneAndDelete({
      user: req.user._id,
      schemeId: req.params.id,
    });

    await Activity.create({
      user: req.user._id,
      title: "Removed Scheme",
      description: "Removed from favourites.",
      type: "remove",
    });

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Remove Failed",
    });
  }
};

export const getSavedSchemes = async (req, res) => {
  try {
    const saved = await SavedScheme.find({
      user: req.user._id,
    });

    res.json({
      success: true,
      saved,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
