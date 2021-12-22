const AddedThread = require('../AddedThread');

describe('AddedThread entities', () => {
  it('should throw error when invoke abstract behavior', () => {
    // Arrange
    const payload = {
      title: 'title',
      owner: 'bob',
    };

    // Action & Assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data specification', () => {
    // Arrange
    const payload = {
      id: '123',
      title: true,
      owner: 'bob',
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddedThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'bob-123',
      title: 'title',
      owner: 'bob',
    };

    // Action
    const { id, title, owner } = new AddedThread(payload);

    // assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(owner).toEqual(payload.owner);
  });
});
