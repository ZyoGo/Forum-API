const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const AddedThread = require('../../Domains/threads/entities/AddedThread');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(thread, owner) {
    const { title, body } = thread;
    const id = `thread-${this._idGenerator()}`;
    const dateGenerator = new Date().toLocaleString();
    const query = {
      text: 'INSERT INTO threads (id, title, body, date, owner_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, title, owner_id as owner',
      values: [id, title, body, dateGenerator, owner],
    };

    const result = await this._pool.query(query);

    return new AddedThread({ ...result.rows[0] });
  }

  async getThreadById(id) {
    const query = {
      text: `SELECT threads.id, threads.title, threads.body, threads.date, users.username
      FROM threads
      INNER JOIN users ON threads.owner_id = users.id
      WHERE threads.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    // console.log(`result: ${JSON.stringify(result.rows)}`);

    if (!result.rowCount) {
      throw new NotFoundError('thread not found');
    }

    return result.rows[0];
  }

  async verifyIsThreadAvailable(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('thread is not found');
    }
  }
}

module.exports = ThreadRepositoryPostgres;
