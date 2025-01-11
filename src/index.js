import app from "./server.js"; // Import the configured Express app
import dotenv from "dotenv";

import usersRoutes from "./users/routes.js";
import videoRoutes from "./video/routes.js";
import commentRoutes from "./comment/routes.js";
import likeRoutes from "./like/routes.js";
dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 3000; // Use a port from environment or default to 3000

app.use("/users", usersRoutes);
app.use("/video", videoRoutes);
app.use("/comment", commentRoutes);
app.use("/like", likeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
