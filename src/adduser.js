const { MongoClient } = require('mongodb');

async function runScript() {
  const agg = [
    {
      '$match': {
        'rating': 5
      }
    }, {
      '$limit': 5
    }
  ];

  const client = await MongoClient.connect(
    'mongodb+srv://nghia:nghia@se-ecommerce.lkwnlpo.mongodb.net/'
  );
  const coll = client.db('SE-Ecommerce').collection('Phone_Comments');
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  await client.close();

  console.log(result);
}

runScript();