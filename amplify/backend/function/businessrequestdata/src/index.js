// import Amplify, { Storage } from 'aws-amplify';
// import awsconfig from '../../../../src/aws-exports.js';
// Amplify.configure(awsconfig);

const aws = require('aws-sdk')
const ses = new aws.SES()

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      //pull off items from stream
      // const candidateName = streamedItem.dynamodb.NewImage.name.S
      const candidateEmail = streamedItem.dynamodb.NewImage.email.S
      // Storage.get("bbl_timeline.json", { download: true, expired: 1000 })
      // .then(url => {
      console.log(candidateEmail)
      console.log(process.env.SES_EMAIL)
      await ses
          .sendEmail({
            Destination: {
              ToAddresses: [process.env.SES_EMAIL],
            },
            Source: process.env.SES_EMAIL,
            Message: {
              Subject: { Data: 'Candidate Submission' },
              Body: {
                Text: { Data: "helo" },
              },
            },
          })
          .promise()
      // })
    }
  }
  return { status: 'done' }
}