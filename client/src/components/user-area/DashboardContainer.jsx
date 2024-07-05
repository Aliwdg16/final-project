import Chat from "./Chat";
import Taskoverview from "../Aufträge/Taskoverview";
import UserProfile from "./UserProfile";
import MatchingPage from "../Aufträge/MatchingPage";

const DashboardContainer = (currentLocation) => {
  console.log(currentLocation);

  switch (currentLocation.currentLocation) {
    case "Dashboard":
      return <MatchingPage />;
    case "Chat":
      return <Chat />;
    case "Task Overview":
      return <Taskoverview />;
    case "User Profile":
      return <UserProfile />;
    default:
      return null;
  }
};

export default DashboardContainer;