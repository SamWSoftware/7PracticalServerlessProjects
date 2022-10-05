import { SESClient, SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-ses';

const sesClient = new SESClient({});

export const sendEmail = async ({
  email,
  text,
  subject,
  html,
}: {
  email: string;
  text: string;
  subject: string;
  html?: string;
}) => {
  const params: SendEmailCommandInput = {
    Source: 'sam@completecoding.io',
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: text,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
  };

  if (html) {
    params.Message.Body.Html = {
      Data: html,
      Charset: 'UTF-8',
    };
  }

  const command = new SendEmailCommand(params);

  const res = await sesClient.send(command);
  return res.MessageId;
};

const SES = {
  sendEmail,
};

export default SES;
