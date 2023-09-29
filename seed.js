import { db, Campus, Student } from './server/db/index.js';

const seed = async () => {
  try {
    await db.sync({ force: true });

    const [campus1, campus2] = await Promise.all([
      Campus.create({
        name: 'Tokyo-3',
        address: 'site of the third impact',
        description:
          'New Tokyo-3 City (第３新東京市[?], "Dai-san shin Tōkyō-shi"), commonly known as Tokyo-3, is located above the GeoFront, with buildings of that can retract into the ground for safety, and other buildings that contain the launch ports and weapons caches for the Evas. It is projected to replace Tokyo-2 as the capital of Japan, but was designed to intercept all incoming Angels to Japan. The city is defended by numerous missile stations around it. It was built in the location of pre-Impact Hakone, approximately 80 kilometers southwest of Tokyo-1. In Episode 01, Shinji is picked up in the neighboring city of Atami, 25 kilometers away',
        imageUrl:
          'https://animesher.com/orig/1/131/1317/13174/animesher.com_misato-neon-genesis-evangelion-sunrise-1317427.jpg',
      }),
      Campus.create({
        name: "Kame's House",
        address: 'NBI 8250012 B',
        description: 'A house on a very small island in the middle of the sea',
        imageUrl: 'https://static.wikia.nocookie.net/ultradragonball/images/2/27/KH1.png',
      }),
    ]);

    const [Student1, Student2, Student3, Student4] = await Promise.all([
      Student.create({
        firstName: 'Shinji',
        lastName: 'Ikari',
        email: 'icant@gmail.com',
        imageUrl:
          'https://static.wikia.nocookie.net/evangelion/images/9/92/Shinji_Ikari.png',
        gpa: 3,
        campusId: 1,
      }),
      Student.create({
        firstName: 'Asuka',
        lastName: 'Langley',
        email: 'bakaShinji@gmail.com',
        imageUrl:
          'https://static.miraheze.org/greatcharacterswiki/b/be/Asuka_Langley_Soryu.png',
        gpa: 3,
        campusId: 1,
      }),
      Student.create({
        firstName: 'Rei',
        lastName: 'Ayanami',
        email: 'firstChild@gmail.com',
        imageUrl: 'https://static.wikia.nocookie.net/evangelion/images/e/e6/Rei_Ayanami.png',
        gpa: 4,
        campusId: 1,
      }),
      Student.create({
        firstName: 'Unit 01',
        lastName: '(Yui Ikari)',
        email: 'makeMechsGreatAgain@gmail.com',
        imageUrl:
          'https://static.wikia.nocookie.net/evangelion/images/2/2c/Evangelion_Unit-01_front1.png',
        gpa: 1,
      }),
    ]);
  } catch (err) {
    console.log(err);
  }
};

// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.mjs` or `npm run seed`)

async function runSeed() {
  try {
    await seed();
    console.log('Seeding success!');
  } catch (err) {
    console.error('Oh noes! Something went wrong!');
    console.error(err);
  } finally {
    db.close();
  }
}

if (import.meta.main) {
  runSeed();
}

export default seed;