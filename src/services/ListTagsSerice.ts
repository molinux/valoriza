/* eslint-disable linebreak-style */
import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepository';
import { classToPlain } from 'class-transformer';


class ListTagsService {
  async execute() {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    // Uma das formas de customizar um campo (colocar hashtag)
    // Porém dessa forma só vai implementar após percorrer todo o array
    // let tags = await tagsRepositories.find();
    // tags = tags.map(tag => ({ ...tag, nameCustom: `#${tag.name}` }));

    const tags = await tagsRepositories.find();

    return classToPlain(tags);
  }
}

export { ListTagsService };