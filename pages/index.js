import Head from "next/head";
import TextField from "@material-ui/core/TextField";
import Link from "next/link";
import { wrapper } from "../redux/store";
function Home() {
  return (
    <div className="text-center p-2 m-2">
      <main>
        <h1>Next.js Boilerplate</h1>
        <Link href="/about">
          <a>About</a>
        </Link>
      </main>
    </div>
  );
}

Home.getInitialProps = ({ store, pathname, req, res }) => {};
export default wrapper.withRedux(Home);
