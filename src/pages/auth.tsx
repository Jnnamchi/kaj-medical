import { withAuthUser, AuthAction } from "next-firebase-auth";
import AuthPage from "../containers/AuthPage";

function Auth() {
  return (
    <div className="container px-4 mx-auto">
      <AuthPage />
    </div>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP
})(Auth);
