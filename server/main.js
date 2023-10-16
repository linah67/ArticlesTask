import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ArticlesCollection } from '/imports/db/ArticlesCollection';
import { CommentsCollection } from '../imports/db/CommentsCollection';
import '/imports/api/ArticleMethods';
import '/imports/api/CommentsMethods';
import '/imports/api/ArticlePublications';
import '/imports/api/CommentPublications';
const insertArticle = (title, description) =>
  ArticlesCollection.insert({
    title: title,
    description: description,
    date: new Date(),
  });

const SEED_USERNAME = 'meteorite@gmail.com';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  
    // Accounts.createUser({
    //   email: SEED_USERNAME,
    //   password: SEED_PASSWORD,
    // });
    const handleAddComment=()=>{
      CommentsCollection.insert({
        articleId: _id,
        text:comment,
        date: new Date()
      }); 
     }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (ArticlesCollection.find().count() === 0) {
    [
      {title:"Article 1",description:"d1"},
      {title:"Article 2",description:"d2"},
      {title:"Article 3",description:"d3"},
        ].forEach(article => insertArticle(article.title,article.description));
  }
});