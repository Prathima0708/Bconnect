import { images } from "../constants";

export const contacts = [
    {
        id: '1',
        userName: 'John Doe',
        userImg: images.avatar,
        isOnline: false,
        lastSeen: '3 Days ago',
        lastMessage: 'How is it going...',
        messageInQueue: 3,
        sentDate: '12/7',
    },
    {
        id: '2',
        userName: 'Marry Lio',
        userImg: images.avatar2,
        isOnline: true,
        lastSeen: 'Online',
        lastMessage: 'Good morning...',
        messageInQueue: 0,
        sentDate: '12/7',
    },
    {
        id: '3',
        userName: 'Lucia Mu',
        userImg: images.avatar3,
        isOnline: false,
        lastSeen: '2 weeks ago',
        lastMessage: "What's up...",
        messageInQueue: 0,
        sentDate: '12/7',
    },
    {
        id: '4',
        userName: 'Raki Lili',
        userImg: images.avatar4,
        isOnline: true,
        lastSeen: 'Online',
        lastMessage: 'Send me the link',
        messageInQueue: 0,
        sentDate: 'Today',
    },
    {
        id: '5',
        userName: 'Raki Devine',
        userImg: images.avatar5,
        isOnline: false,
        lastSeen: '5 days ago',
        lastMessage: 'We are doing...',
        messageInQueue: 0,
        sentDate: '23/9',
    },
    {
        id: '6',
        userName: 'Aris Yup',
        userImg: images.avatar9,
        isOnline: true,
        lastSeen: 'Online',
        lastMessage: 'How is it going...',
        messageInQueue: 3,
        sentDate: 'Today',
    },
    {
        id: '7',
        userName: 'Aris Yup',
        userImg: images.avatar6,
        isOnline: true,
        lastSeen: 'Online',
        lastMessage: 'How is it going...',
        messageInQueue: 3,
        sentDate: '12/7',
    },
    {
        id: '8',
        userName: 'Billy Di',
        userImg: images.avatar7,
        isOnline: true,
        lastSeen: 'Online',
        lastMessage: 'How is it going...',
        messageInQueue: 3,
        sentDate: '12/7',
    },
    {
        id: '9',
        userName: 'Aris Biu',
        userImg: images.avatar8,
        isOnline: true,
        lastSeen: 'Online',
        lastMessage: 'How is it going...',
        messageInQueue: 3,
        sentDate: '12/7',
    },
];

export const furnitureCategories = [
    {
      id: 1,
      name: "Dairy products",
      image: images.shop8,
      description: "Explore our entire products",
      startingPrice: 99.99
    },
    {
      id: 2,
      name: "Spices",
      image: images.shop10,
      description: "Find comfortable and stylish sofas for your living room",
      startingPrice: 299.99
    },
    {
      id: 3,
      name: "Choco chips",
      image: images.shop9,
      description: "Discover cozy and elegant beds for a restful night's sleep",
      startingPrice: 399.99
    },
  
  ];
  
  
  export const orders = [
    {
      id: 1,
      name: 'Choco chips',
      type: 'Product type',
      price: 299.99,
      numberOfItems: 1,
      receipt: "#20231001",
      image: images.shop8
    },
    {
      id: 2,
      name: 'Spices',
      type: 'Product type',
      price: 499.99,
      numberOfItems: 2,
      receipt: "#20231002",
      image: images.shop10
    },
    {
      id: 3,
      name: 'Amul products',
      type: 'Product type',
      price: 199.99,
      numberOfItems: 1,
      receipt: "#20231003",
      image: images.shop11
    },
  ];
  
  export const orderHistory = [
    {
      id: 1,
      status: "Completed",
      date: "12 Oct, 10:30",
      name: 'Choco chips',
      type: 'Lorem',
      price: 299.99,
      numberOfItems: 1,
      receipt: "#20231001",
      image: images.shop8
    },
    {
      id: 2,
      status: "Completed",
      date: "13 Oct, 14:15",
      name: 'Spices',
      type: 'Lorem',
      price: 499.99,
      numberOfItems: 2,
      receipt: "#20231002",
      image: images.shop10
    },
    {
      id: 3,
      status: "Canceled",
      date: "14 Oct, 11:45",
      name: 'Amul products',
      type: 'Lorem',
      price: 199.99,
      numberOfItems: 1,
      receipt: "#20231003",
      image: images.shop11
    },
    {
      id: 4,
      status: "Canceled",
      date: "14 Oct, 11:45",
      name: 'Amul products',
      type: 'Lorem',
      price: 199.99,
      numberOfItems: 1,
      receipt: "#20231003",
      image: images.shop11
    },
  ];
  
  
  export const orderList = [
    {
        latitude: 48.8566,
        longitude: 2.3522,
        name: 'Order 1',
        description: 'Order description 2',
    },
    {
        latitude: 43.2965,
        longitude: 5.3698,
        name: 'Order 2',
        description: 'Order description 2',
    },
    {
        latitude: 45.764,
        longitude: 4.8357,
        name: 'Order 3',
        description: 'Order description 3',
    },
    {
        latitude: 43.6045,
        longitude: 1.4442,
        name: 'Order 4',
        description: 'Order description 4',
    },
    {
        latitude: 43.7102,
        longitude: 7.2661,
        name: 'Order 5',
        description: 'Order description 5',
    },
  ];
  
  
  export const TransactionHistoryData = [
    { 
        id: 1,
        image: images.shop9,
        avatar: images.avatar,
        name: 'Lorem Ipsum',
        message: 'Lorem Ipsum has been the industry standard',
        time: '2023-10-06T03:55:02.922Z'
    },
    { 
        id: 2,
        image: images.shop10,
        avatar: images.avatar2,
        name: 'Lorem Ipsum',
        message: 'Lorem Ipsum has been the industry standard',
        time: '2023-10-02T03:55:02.922Z'
    },
    { 
        id: 3,
        image: images.shop11,
        avatar: images.avatar3,
        name: 'Lorem Ipsum',
        message: 'Lorem Ipsum has been the industry standard',
        time: '2023-09-16T03:55:02.922Z'
    },
    { 
        id: 4,
        image: images.shop9,
        avatar: images.avatar4,
        name: 'Lorem Ipsum',
        message: 'Lorem Ipsum has been the industry standard',
        time: '2023-09-16T03:55:02.922Z'
    },
    { 
        id: 5,
        image: images.shop12,
        avatar: images.avatar5,
        name: 'Lorem Ipsum',
        message: 'Lorem Ipsum has been the industry standard',
        time: '2023-08-16T03:55:02.922Z'
    },
  ];
  
  export const notifications = [
      { 
          id: 1,
          image: images.shop9,
          avatar: images.avatar,
          name: 'Lorem Ipsum',
          message: 'Lorem Ipsum has been the industry standard',
          time: '2023-10-06T03:55:02.922Z'
      },
      { 
          id: 2,
          image: images.shop10,
          avatar: images.avatar2,
          name: 'Lorem Ipsum',
          message: 'Lorem Ipsum has been the industry standard',
          time: '2023-10-02T03:55:02.922Z'
      },
      { 
          id: 3,
          image: images.shop11,
          avatar: images.avatar3,
          name: 'Lorem Ipsum',
          message: 'Lorem Ipsum has been the industry standard',
          time: '2023-09-16T03:55:02.922Z'
      },
      { 
          id: 4,
          image: images.shop9,
          avatar: images.avatar4,
          name: 'Lorem Ipsum',
          message: 'Lorem Ipsum has been the industry standard',
          time: '2023-09-16T03:55:02.922Z'
      },
      { 
          id: 5,
          image: images.shop12,
          avatar: images.avatar5,
          name: 'Lorem Ipsum',
          message: 'Lorem Ipsum has been the industry standard',
          time: '2023-08-16T03:55:02.922Z'
      },
  
  ];
  