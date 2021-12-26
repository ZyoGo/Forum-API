const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadTableTestHelper = {
  async addThread({
    id = 'Dicoding-123',
    title = 'Dicoding Thread',
    body = 'Thread from Dicoding Indonesia',
    owner = 'user-123',
  }) {
    const query = {
      text: 'INSERT INTO threads (id, title, body, owner_id) VALUES ($1, $2, $3, $4) RETURNING id, title, owner_id as owner',
      values: [id, title, body, owner],
    };

    const result = await pool.query(query);

    return result.rows[0];
  },

  async findThreadById(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows[0].id;
  },

  async cleanTable() {
    await pool.query('DELETE FROM threads WHERE 1=1');
  },
};

module.exports = ThreadTableTestHelper;
