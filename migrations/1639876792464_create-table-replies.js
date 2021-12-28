/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('replies', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      notNull: true,
    },
    content: {
      type: 'TEXT',
      notNull: true,
    },
    date: {
      type: 'TEXT',
      notNull: true,
    },
    owner_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    comment_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    is_delete: {
      type: 'BOOLEAN',
      default: false,
    },
  });

  pgm.addConstraint('replies', 'fk_replies.comment_id_comments.id', 'FOREIGN KEY (comment_id) REFERENCES comments(id)');
  pgm.addConstraint('replies', 'fk_replies.owner_id_users.id', 'FOREIGN KEY (owner_id) REFERENCES users(id)');
};

exports.down = (pgm) => {
  pgm.dropConstraint('replies', 'fk_replies.comment_id_comments.id');
  pgm.dropConstraint('replies', 'fk_replies.owner_id_users.id');
  pgm.dropTable('replies');
};
