import React, { Suspense } from "react";
import ResetPasswordFrom from "./reset-password-form";

const ResetPasswordPage = () => {
  return (
    <div>
      <h1>reset</h1>

      <Suspense fallback={<p>Loading ...</p>}>
        <ResetPasswordFrom></ResetPasswordFrom>
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
