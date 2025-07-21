import Stats from "../models/statsModel.js";

// Controller to add a new stat
export const addStatsController = async (req, res) => {
  try {
    const { accountActive, totalTransactions, averageTransactionCost } =
      req.body;

    if (
      accountActive === undefined ||
      totalTransactions === undefined ||
      averageTransactionCost === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    const stats = new Stats({
      accountActive,
      totalTransactions,
      averageTransactionCost,
    });

    await stats.save();

    return res.status(201).json({
      message: "Stats successfully added!",
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Add Stat Error:", error.message);

    return res.status(500).json({
      message: "Server error while adding stats.",
      success: false,
    });
  }
};

// Controller to get stats:
export const getStatsController = async (req, res) => {
  try {
    const stats = await Stats.find({});
    return res.status(200).json(stats);
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Update:
export const updateStatController = async (req, res) => {
  try {
    const id = req.params.id;

     if (!id) {
      return res.status(400).json({
        message: "ID is required",
        success: false,
      });
    }

    const { accountActive, totalTransactions, averageTransactionCost } = req.body || {};

     if (
      accountActive === undefined ||
      totalTransactions === undefined ||
      averageTransactionCost === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

     const stat = await Stats.findById(id);

    if (!stat) {
      return res.status(404).json({
        message: "Stat not found",
        success: false,
      });
    }

     stat.accountActive = accountActive;
    stat.totalTransactions = totalTransactions;
    stat.averageTransactionCost = averageTransactionCost;

    // Save changes
    await stat.save();

    return res.status(200).json({
      message: "Stat updated successfully",
      success: true,
      data: stat, 
    });
  } catch (error) {
    console.error("Update Stat Error:", error.message);

    return res.status(500).json({
      message: "Server error while updating stat",
      success: false,
    });
  }
};


// Controller to delete:
export const deleteStatController = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        message: "ID is required",
        success: false,
      });
    }

    const stat = await Stats.findByIdAndDelete(id);

    if (!stat) {
      return res.status(404).json({
        message: "Stat not found or invalid ID",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Stat deleted successfully",
      success: true,
      data: stat,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      message: "Server error  ",
      success: false,
    });
  }
};
