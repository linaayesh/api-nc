import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import config from '../config';

interface googleAuthInterface{
  googleId: string,
  email:string
  username: string,
  image: string,
}

type GoogleAuth = (tokenId: string) => Promise<googleAuthInterface>;

const googleAuthentication: GoogleAuth = async (tokenId: string) => {
  const client = new OAuth2Client(config.server.CLIENT_ID);
  const verify = async ():Promise<void> => {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: config.server.CLIENT_ID,
    });
    ticket.getPayload();
  };
  verify().catch(console.error);
  const {
    data: {
      sub,
      email,
      name: username,
      picture: image,
    },
  } = await axios.get(
    `${config.server.GOOGLE_API}tokeninfo?id_token=${tokenId}`,
  );
  const lowerCaseEmail = email.toLowerCase();

  return ({
    googleId: sub, email: lowerCaseEmail, username, image,
  });
};

export default googleAuthentication;
