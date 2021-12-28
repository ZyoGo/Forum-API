/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('threads', {
    id: {
      type: 'VARCHAR(50)',
      notNull: true,
      primaryKey: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    body: {
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
  });

  pgm.addConstraint('threads', 'fk_threads.owner_id_users.id', 'FOREIGN KEY (owner_id) REFERENCES users(id)');
};

exports.down = (pgm) => {
  pgm.dropConstraint('threads', 'fk_threads.owner_id_users.id');
  pgm.dropTable('threads');
};
