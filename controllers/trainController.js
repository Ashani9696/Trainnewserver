import Train from "../models/train.js";

export const addTrain = async (req, res) => {
  try {
    const train = new Train({ ...req.body });
    await train.save();
    res.send("Train has been added");
  } catch (error) {
    throw error;
  }
};

export const getTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    res.status(200).json(trains);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const findById = async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);

    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    res.json(train);
  } catch (error) {
    console.error("Error in findById:", error);
    res.status(500).json({ message: "Server Error findById" });
  }
};

export const changeEngine = async (req, res) => {
  const { newEngineId } = req.body;
  const trainId = req.params.id;

  try {
    const train = await Train.findById(trainId);

    // Mark the current engine as detached and set current to false
    train.engineHistory = train.engineHistory.map((engine) => {
      if (engine.current) {
        engine.detachedAt = new Date();
        engine.current = false;
      }
      return engine;
    });

    // Add the new engine to the history and set it as current
    train.engineHistory.push({
      engineId: newEngineId,
      current: true,
    });

    // Update the train's engineId to the new engine
    train.engineId = newEngineId;

    await train.save();

    res.json({ message: "Engine switched successfully", train });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


