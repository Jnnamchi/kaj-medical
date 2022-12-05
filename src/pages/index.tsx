import { ChangeEvent, useState } from "react";
import Layout from "../components/layout";
import HomePage from "../containers/HomePage";

export default function Home() {
  const [file, setFile] = useState<File>();
  console.log("🚀 ~ file: index.tsx:7 ~ Home ~ file", file);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }
    const data = new FormData();
    data.append(`doc`, file, file.name);

    // 👇 Uploading the file using the fetch API to the server
    fetch("api/tamper-detect", {
      // fetch("http://pdf-analyser.edpsciences.org/check", {
      method: "POST",
      body: data
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <Layout>
      <div>
        <input type="file" name="doc" onChange={handleFileChange} />

        <div>{file && `${file.name} - ${file.type}`}</div>

        <button onClick={handleUploadClick}>Upload</button>
      </div>
      <HomePage />
    </Layout>
  );
}
Home.requireAuth = true;
