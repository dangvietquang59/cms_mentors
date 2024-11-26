import "./App.css";
import AppRouter from "./routes/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster />
      <AppRouter />
    </div>
  );
}

export default App;
