import { Button } from "../../styles/pages/about";
import Authenticated from "../../components/reusable/HOC/Authenticated";
function index() {
  return (
    <div>
      <h2>About</h2>
      <Button>Red</Button>
    </div>
  );
}

export default Authenticated(index);
