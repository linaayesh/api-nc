import { Content, IContent } from 'db-models-nc';
import { CustomError } from '../../helpers';
import { HttpStatus } from '../../helpers/constants';
import { matchUserContent } from '../../interfaces/DtoContents';

type IMatchUserContent = (_: matchUserContent) => Promise<IContent>

const matchUserContent: IMatchUserContent = async ({
  id,
  userId,
  filmingCosts,
  launchDate,
  advance,
  feePaid,
}) => {
  const content = await Content.findOne({ where: { id } });
  if (!content) throw new CustomError('No such a content', HttpStatus.NOT_FOUND);

  content.userId = userId;
  content.filmingCosts = filmingCosts;
  content.launchDate = launchDate;
  content.advance = advance;
  content.feePaid = feePaid;

  await content.save();
  return content;
};

export default matchUserContent;
