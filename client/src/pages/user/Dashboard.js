//to use loaded user data
import Menubar from "../../components/Menubar";
import { useAuth } from "../../context/auth";


export default function Dashboard() {
  const [auth, setAuth] = useAuth();

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Dashboard</h1>
      <Menubar />
      <p>{JSON.stringify(auth, null, 4)}</p>
    </div>
  );
}