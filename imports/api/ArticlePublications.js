import { Meteor } from 'meteor/meteor';
import { ArticlesCollection } from '../db/ArticlesCollection';

Meteor.publish('articles', function publishArticles() {
  return ArticlesCollection.find();
});