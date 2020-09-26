import React, { Fragment, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Typography, Container, Box, Button } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { getFromStorage } from '../../helper/localStorage';
import { ContestContext } from '../../context/ContestContext';
import Alert from '../createContestComponents/Alert';
import useStyles from './SubmissionUploadStyles';

const SubmissionUpload = () => {
  const classes = useStyles();
  const context = useContext(ContestContext);

  const [files, setFiles] = useState([]);
  const [data, setData] = useState({});

  const params = useParams();
  const history = useHistory();
  const token = getFromStorage('auth_token');

  const handleChange = (uploads) => {
    setFiles(uploads);
  };

  //to get contest creator's info
  useEffect(() => {
    async function fetchData(contestId) {
      const res = await axios.get(`/api/contest/${contestId}`);
      setData(res.data);
    }
    fetchData(params.id);
  }, [params.id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const uploadCount = [];

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`submissionPic`, files[i]);
    }

    for (let pic of formData.entries()) {
      uploadCount.push(pic);
    }

    if (uploadCount.length < 1) {
      return context.alertFn('Please upload at least one picture.');
    }
    try {
      const res = await axios.post(
        `/api/contest/${params.id}/submission`,
        formData,
        {
          headers: {
            auth_token: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      history.push(`/contest/${params.id}`);
    } catch (error) {
      if (error.response.status === 500) {
        return context.alertFn(
          'There was a problem with the server. Please try again.'
        );
      } else {
        return context.alertFn(error.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      <Typography variant="h4" m={3} className={classes.title}>
        Create Submission
      </Typography>
      <Container maxWidth="md">
        <Box boxShadow={3} className={classes.mainBox}>
          <Container className={classes.innerContainer}>
            <Typography className={classes.subtitle}>
              Submission for {data.user && data.user.name}'s Tattoo
            </Typography>
            <DropzoneArea
              acceptedFiles={['image/jpeg', 'image/png']}
              onChange={handleChange}
            />
            <Box className={classes.alignItemsAndJustifyContent}>
              <Button
                variant="contained"
                className={classes.contestButton}
                onClick={(e) => onSubmit(e)}
              >
                Send Submission for {data.user && data.user.name}
              </Button>
            </Box>
            <Alert />
          </Container>
        </Box>
      </Container>
    </Fragment>
  );
};

export default SubmissionUpload;
