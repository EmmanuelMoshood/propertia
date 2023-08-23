//to use loaded user data
import { useAuth } from "../context/auth";


export default function Home() {
  const [auth, setAuth] = useAuth();

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Home</h1>
      <p>{JSON.stringify(auth)}</p>
      <div className="mt-5">Test</div>
    </div>
  );
}