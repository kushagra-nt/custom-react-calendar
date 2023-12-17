import Calendar from "./components/Calendar";
import EventModal from "./components/EventModal";
import Navbar from "./components/Navbar";
import useGlobalContext from "./context/GlobalContext";

function App() {
  const { showEventModal } = useGlobalContext();

  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar />

      {/* modal for adding, deleting or editing events */}
      {showEventModal && <EventModal />}

      <Calendar />
    </div>
  );
}

export default App;
