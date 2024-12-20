import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return <SignUp signInFallbackRedirectUrl="/new-user" />;
};

export default SignUpPage;
