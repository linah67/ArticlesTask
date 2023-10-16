import { Meteor } from 'meteor/meteor';
import { CommentsCollection } from '../db/CommentsCollection';

Meteor.publish('comments', function publishComments() {
  return CommentsCollection.find({});
});