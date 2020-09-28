import React, { ChangeEvent } from "react";
import uploadImg from "assets/img/upload.png";
import styles from "./FileUploadBox.module.css";

interface Props {
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function FileUploadBox({ handleFileUpload }: Props) {
  return (
    <>
      <label className={styles.fileUploadBox} htmlFor="fileUpload">
        <img
          className={styles.fileUploadIcon}
          src={uploadImg}
          alt="Upload Json File"
        />
        <div>Upload File</div>
      </label>
      <input
        className={styles.fileUploadInput}
        id="fileUpload"
        type="file"
        accept="application/json"
        onChange={handleFileUpload}
      />
    </>
  );
}
