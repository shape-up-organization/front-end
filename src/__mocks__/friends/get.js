export default Object.freeze({
  data: {
    friends: [
      {
        id: 1,
        online: true,
        name: 'test one',
        username: 'testone',
        lastMessage: {
          text: 'test last',
          date: '2022-04-02',
        },
        unreadMessages: 0,
      },
      {
        id: 2,
        online: true,
        name: 'test two',
        username: 'testtwo',
        lastMessage: {
          text: 'test last',
          date: '2022-04-02',
        },
        unreadMessages: 0,
      },
    ],
    // friends: [
    //   {
    //     id: 1,
    //     online: true,
    //     name: 'Jóhn Doe Doe Doe',
    //     username: 'johndoe',
    //     lastMessage: {
    //       text: 'Hello, how are you?',
    //       date: '2022-04-02',
    //     },
    //     unreadMessages: 2,
    //   },
    //   {
    //     id: 2,
    //     online: false,
    //     name: 'Jane Doe',
    //     username: 'janedoe',
    //     lastMessage: {
    //       text: 'Hello, how are you?',
    //       date: '2022-04-02T10:30:00.000Z',
    //     },
    //     unreadMessages: 0,
    //   },
    //   {
    //     id: 3,
    //     online: false,
    //     name: 'Bailin Doe',
    //     username: 'bailindoe',
    //     lastMessage: {
    //       text: 'Hello, how are you?',
    //       date: '2022-04-02T10:30:00.000Z',
    //     },
    //     unreadMessages: 102,
    //   },
    //   {
    //     id: 4,
    //     online: true,
    //     name: 'Birigu Doe',
    //     username: 'birigudoe',
    //     lastMessage: {
    //       text: 'Hello, how are you?',
    //       date: '2022-04-02T10:30:00.000Z',
    //     },
    //     unreadMessages: 10,
    //   },
    //   {
    //     id: 5,
    //     online: false,
    //     name: 'John Doe',
    //     username: 'johndoe',
    //     lastMessage: {
    //       text: 'Hello, how are you? Hello, how are you? Hello, how are you?',
    //       date: '2022-04-02T10:30:00.000Z',
    //     },
    //     unreadMessages: 2,
    //   },
    //   {
    //     id: 6,
    //     online: true,
    //     name: 'Jane Doe',
    //     username: 'janedoe',
    //     lastMessage: {
    //       text: 'Hello, how are you?',
    //       date: '2022-04-02T10:30:00.000Z',
    //     },
    //     unreadMessages: 0,
    //   },
    //   {
    //     id: 7,
    //     online: false,
    //     name: 'John Doe Doe Doe',
    //     username: 'johndoe',
    //     lastMessage: {
    //       text: 'Hello, how are you?',
    //       date: '2022-04-02',
    //     },
    //     unreadMessages: 2,
    //   },
    //   {
    //     id: 8,
    //     online: false,
    //     name: 'Jane Doe',
    //     username: 'janedoe',
    //     lastMessage: {
    //       text: 'Hello, how are you?',
    //       date: '2022-04-02T10:30:00.000Z',
    //     },
    //     unreadMessages: 0,
    //   },
    //   {
    //     id: 9,
    //     online: false,
    //     name: 'Bailin Doe',
    //     username: 'bailindoe',
    //     lastMessage: {
    //       text: 'Hello, how are you?',
    //       date: '2022-04-02T10:30:00.000Z',
    //     },
    //     unreadMessages: 0,
    //   },
    //   {
    //     id: 10,
    //     online: true,
    //     name: 'Birigu Doe',
    //     username: 'birigudoe',
    //     lastMessage: {
    //       text: 'Hello, how are you?',
    //       date: '2022-04-02T10:30:00.000Z',
    //     },
    //     unreadMessages: 10,
    //   },
    //   {
    //     id: 11,
    //     online: true,
    //     name: 'John Doe',
    //     username: 'johndoe',
    //     lastMessage: {
    //       text: 'Hello, how are you? Hello, how are you? Hello, how are you?',
    //       date: '2022-04-02T10:30:00.000Z',
    //     },
    //     unreadMessages: 2,
    //   },
    //   {
    //     id: 12,
    //     online: true,
    //     name: 'Jane Doe',
    //     username: 'janedoe',
    //     lastMessage: {
    //       text: 'Hello, how are you?',
    //       date: '2022-04-02T10:30:00.000Z',
    //     },
    //     unreadMessages: 0,
    //   },
    // ],
    squads: [
      {
        id: 1,
        name: 'Group 1',
        lastMessage: {
          text: 'Hello, how are you?',
          date: '2022-04-02',
        },
        unreadMessages: 2,
      },
      {
        id: 2,
        name: 'AiAiGroup 2',
        lastMessage: {
          text: 'Hello, how are you?',
          date: '2022-04-02',
        },
        unreadMessages: 120,
      },
      {
        id: 3,
        name: 'Pimbalim 3',
        lastMessage: {
          text: 'Hello, how are you?',
          date: '2022-04-02',
        },
        unreadMessages: 0,
      },
    ],
  },
})
