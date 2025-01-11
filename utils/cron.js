import cron from "node-cron";
import { fetchCryptoData } from "../controllers/cryptoController.js";

export const initCron = async () => {
  try {
    // Schedule the task to run every 2 hours
    cron.schedule("0 */2 * * *", async () => {
      console.log("Fetching crypto data...");
      await fetchCryptoData();
      console.log("Successfully Updated the database");
    });
  } catch (err) {
    console.error("Error initializing cron job:", err);
  }
};
