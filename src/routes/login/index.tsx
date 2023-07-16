import { Component } from "solid-js";
import CryptoJS from "crypto-js";
import { useNavigate } from "@solidjs/router";

export const LoginPage: Component = () => {
  const navigate = useNavigate();

  const submitForm = (event: SubmitEvent) => {
    event.preventDefault();

    const decrypted = CryptoJS.AES.decrypt(
      import.meta.env.VITE_ENCRYPTED_TOKEN,
      (event.target as HTMLFormElement).password.value
    ).toString(CryptoJS.enc.Utf8);

    if (decrypted) {
      localStorage.setItem("token", decrypted);

      navigate("/");
    }
  };

  return (
    <form onSubmit={submitForm}>
      <input type="password" placeholder="password" name="password" />
    </form>
  );
};
