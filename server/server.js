import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});