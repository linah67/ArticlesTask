import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ArticlesCollection } from '../db/ArticlesCollection';
 
Meteor.methods({
  'articles.insert'(title,description) {
    // check(text, String);
    // check(description,String);
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    ArticlesCollection.insert({
      title,
      description,
      createdBy: this.userId,
      createdAt:new Date
    })
  },

  'articles.remove'(_id) {
    check(_id, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    ArticlesCollection.remove(_id);
  },

  'articles.update'(_id, description) {
    // check(taskId, String);
    // check(isChecked, Boolean);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    ArticlesCollection.update(_id, {
      $set: {
        description
      }
    });
  }
});