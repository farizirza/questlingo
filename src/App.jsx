import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
    </div>
  );
}

export default App;
