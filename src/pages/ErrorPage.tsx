import { useRouteError } from "react-router-dom";
import Layout from "../layout";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  return (
    <Layout>
      <div id="error-page">
        <h2 className="text-[2rem]">Oups !</h2>
        <p>Une erreur s'est produite :</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </Layout>
  );
}
