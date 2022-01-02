const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const GetThread = require('../../../Domains/threads/entities/GetThread');
const pool = require('../../database/postgres/pool');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('AddThread method', () => {
    it('should persist AddThread correctly', async () => {
      // Arrange
      const payload = new AddThread({
        title: 'Dicoding Thread',
        body: 'Thread from Dicoding Indonesia',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await UsersTableTestHelper.addUser({});
      await threadRepositoryPostgres.addThread(payload, 'user-123');

      // Assert
      const threads = await ThreadTableTestHelper.findThreadById('thread-123');
      expect(threads).toEqual('thread-123');
    });
  });

  describe('getThreadById method', () => {
    it('should return error when thread is not found', async () => {
      // Arrange
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      await expect(threadRepositoryPostgres.getThreadById('user-234')).rejects.toThrowError(NotFoundError);
    });

    it('should return correctly threads', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadTableTestHelper.addThread({ id: 'Dicoding-123' });

      const expectedThread = {
        id: 'Dicoding-123',
        title: 'Dicoding Thread',
        body: 'Thread from Dicoding Indonesia',
        date: '2021-12-26T12:48:06.733Z',
        username: 'dicoding',
      };

      // Action
      const result = await threadRepositoryPostgres.getThreadById('Dicoding-123');

      // Assert
      expect(result).toEqual(new GetThread(expectedThread));
    });
  });

  describe('verifyIsThreadAvailable method', () => {
    it('should return error when thread is not available', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadTableTestHelper.addThread({ id: 'thread-123' });
      // console.log(await threadRepositoryPostgres.verifyIsThreadAvailable('thread-123'));

      // Action & Assert
      await expect(threadRepositoryPostgres.verifyIsThreadAvailable('thread-234')).rejects.toThrowError(NotFoundError);
    });

    it('should return correctly when thread is available', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });

      // Action & Assert
      await expect(threadRepositoryPostgres.verifyIsThreadAvailable('thread-123')).resolves.toBeUndefined();
    });
  });
});
