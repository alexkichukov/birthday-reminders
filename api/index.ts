import moment from 'moment';

export const getRandomPersonWithBirthday = async (date: Date) => {
  const regex = new RegExp(/^\*\D+(\d+).+\[\[(.+)\]\],.+/gm);

  try {
    const birthdaysResponse = await fetch(
      `https://en.wikipedia.org/w/api.php?action=parse&prop=wikitext&page=${moment(date).format(
        'MMMM_D'
      )}&format=json&section=5&formatversion=2`
    );
    const birthdaysResponseJson = await birthdaysResponse.json();
    const wikitext = (birthdaysResponseJson.parse.wikitext as string)
      .split('\n')
      .filter((s) => regex.test(s));

    // Loop till valid person is found
    while (true) {
      try {
        const [, year, name] = regex.exec(
          wikitext[Math.floor(Math.random() * wikitext.length)]
        ) as any;

        const personResponse = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&titles=${name
            .split(/\s+/g)
            .join(
              '_'
            )}&format=json&formatversion=2&prop=pageimages|extracts&exintro=true&explaintext=true&pithumbsize=300`
        );
        const personResponseJson = await personResponse.json();
        const page = personResponseJson.query.pages[0];
        const image = page.thumbnail.source;
        const extract =
          page.extract.length > 300
            ? page.extract.trim().slice(0, 300) + '...'
            : page.extract.trim();

        return { name, year, image, extract };
      } catch (error) {
        continue;
      }
    }
  } catch (error) {
    throw error;
  }
};
