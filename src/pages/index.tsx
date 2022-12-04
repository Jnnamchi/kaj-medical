import axios from "axios";
import { useEffect } from "react";
import Layout from "../components/layout";
import HomePage from "../containers/HomePage";

export default function Home() {
  useEffect(() => {
    const getData = async () => {
      const form: any = document.querySelector("form");

      if (form) {
        console.log("🚀 ~ file: index.tsx:11 ~ useEffect ~ form", form);
        form.addEventListener("submit", async (e: any) => {
          e.preventDefault();
          const formData = new FormData(form);
          await axios
            .post("http://pdf-analyser.edpsciences.org/check", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    };
    getData();
  }, []);

  return (
    <Layout>
      <form action="#" method="post">
        <input type="file" name="doc" />
        <button type="submit">Submit</button>
      </form>
      <HomePage />
    </Layout>
  );
}
Home.requireAuth = true;
