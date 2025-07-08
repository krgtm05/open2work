import CandidateFeed from './CandidateFeed';
import EmployerFeed from './EmployerFeed';

export default function Feed() {
  const role = localStorage.getItem("role");

  if (role === "candidate") return <CandidateFeed />;
  if (role === "employer") return <EmployerFeed />;
  return <div>Unauthorized. Please login again. Error from Feed Comp</div>;
}
