import React, { useState, Fragment } from 'react';
import axios from 'axios';

const ImgTest = () => {
  const [file1, setFiles1] = useState();
  const [file2, setFiles2] = useState();
  const [file3, setFiles3] = useState();

  const onChangeOne = (e) => {
    setFiles1(e.target.files[0]);
  };
  const onChangeTwo = (e) => {
    setFiles2(e.target.files[0]);
  };
  const onChangeThree = (e) => {
    setFiles3(e.target.files[0]);
  };
  const filesArray = [];

  const setFilesArray = () => {
    filesArray.push(file1);
    filesArray.push(file2);
    filesArray.push(file3);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFilesArray();

    const formData = new FormData();
    for (let i = 0; i < filesArray.length; i++) {
      formData.append(`submissionPic`, filesArray[i]);
    }

    try {
      console.log(formData);
      const res = await axios.post(
        '/api/contest/5f610a2b2a60880de9af58ae/submission',
        formData
      );
      const submission = res.data;
      console.log(submission);
    } catch (error) {
      if (error.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(error.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      <h3>Image test page for submission image upload</h3>
      <p>
        At this point, contest ID and user ID are hardcoded. This page is just
        to test upload functionality.
      </p>
      <form onSubmit={onSubmit}>
        <div>
          <input type="file" id="customFile1" onChange={onChangeOne} />
          <input type="file" id="customFile2" onChange={onChangeTwo} />
          <input type="file" id="customFile3" onChange={onChangeThree} />
          <br />
          <br />
          <label htmlFor="customFile">Upload files</label>
        </div>
        <input type="submit" value="upload" />
      </form>
    </Fragment>
  );
};

export default ImgTest;
