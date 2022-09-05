import { Content } from 'db-models-nc';
import { errorMessages } from '../../helpers';
import { IMatchUserContentDTO } from '../../helpers/dto/services';

const matchUserContent: IMatchUserContentDTO = async ({
  id,
  userId,
  filmingCosts,
  launchDate,
  advance,
  feePaid,
}) => {
  const content = await Content.findOne({ where: { id } });
  if (!content) {
    throw errorMessages.NO_CONTENT_ERROR;
  }

  content.userId = userId;
  content.filmingCosts = filmingCosts;
  content.launchDate = launchDate;
  content.advance = advance;
  content.feePaid = feePaid;

  await content.save();
  return content;
};

export default matchUserContent;
