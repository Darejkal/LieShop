import { Container } from "react-bootstrap";
import MainNavBar from "./components/MainNavBar";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import ListFeed from "./components/ListFeed";

export default function Main() {
  return (
    <main className="vh-100 bg-light">
      <SessionAuth>
        <MainNavBar />
        <Container
          fluid={true}
          className="d-flex flex-column align-items-center justify-content-center border-radius-lg flex-wrap bg-primary"
        >
          <ListFeed/>
        </Container>
      </SessionAuth>
    </main>
  );
}
