import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { CommentsCollection } from '../db/CommentsCollection';
 
Meteor.methods({
  'comments.insert'(text,_id) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    CommentsCollection.insert({
        articleId: _id,
        text: text,
        date: new Date(),
        createdBy:Meteor.userId()
    })
  }

  
});