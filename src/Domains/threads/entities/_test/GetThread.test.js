const GetThread = require('../GetThread');

describe('GetThread entities', () => {
  it('should throw error when invoke abstract behavior', () => {
    // Arrange
    const payload = {
      body: 'body thread',
    };

    // Action & Assert
    expect(() => new GetThread(payload)).toThrowError('GET_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data specification', () => {
    // Arrange
    const payload = {
      id: 'thread-h_2FkLZhtgBKY2kh4CC02',
      title: ['sebuah', 'thread'],
      body: 'sebuah body thread',
      date: '2021-12-08T07:19:09.775Z',
      username: true,
      comments: [],
    };

    // Action and Assert
    expect(() => new GetThread(payload)).toThrowError('GET_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('shoudl create GetThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-h_2FkLZhtgBKY2kh4CC02',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: '2021-12-08T07:19:09.775Z',
      username: 'bob',
      comments: [],
    };

    // Action
    const { id, title, body, date, username, comments } = new GetThread(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(date).toEqual(payload.date);
    expect(username).toEqual(payload.username);
    expect(comments).toEqual(payload.comments);
  });
});
