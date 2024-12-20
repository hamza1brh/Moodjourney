import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return <SignIn signUpFallbackRedirectUrl="/journal" />;
};

export default SignInPage;
