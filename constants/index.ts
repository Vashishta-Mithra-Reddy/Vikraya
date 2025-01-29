export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Auctions',
      route: '/auctions',
    },
    {
      label: 'Create Auction',
      route: '/create-auction',
    },
    {
      label: 'My Profile',
      route: '/profile',
    },
    
  ]

  export const publicHeaderLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Auctions',
      route: '/auctions',
    },
  ]


  export const auctionAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"AuctionCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"highestBidder","type":"address"},{"indexed":false,"internalType":"uint256","name":"highestBid","type":"uint256"}],"name":"AuctionClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"farmer","type":"address"},{"indexed":false,"internalType":"string","name":"cropName","type":"string"},{"indexed":false,"internalType":"uint256","name":"minBid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endTime","type":"uint256"}],"name":"AuctionCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"AuctionPaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"bidder","type":"address"},{"indexed":false,"internalType":"uint256","name":"bidAmount","type":"uint256"}],"name":"BidPlaced","type":"event"},{"inputs":[],"name":"auctionCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"auctions","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address payable","name":"farmer","type":"address"},{"internalType":"string","name":"cropName","type":"string"},{"internalType":"uint256","name":"minBid","type":"uint256"},{"internalType":"uint256","name":"highestBid","type":"uint256"},{"internalType":"address","name":"highestBidder","type":"address"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"bool","name":"closed","type":"bool"},{"internalType":"bool","name":"cancelled","type":"bool"},{"internalType":"bool","name":"paused","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"cancelAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"closeAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_cropName","type":"string"},{"internalType":"uint256","name":"_minBid","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"}],"name":"createAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"pauseAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"placeBid","outputs":[],"stateMutability":"payable","type":"function"}]
  export const auctionAddress = "0x8C44598b53C5CafC5fa437Ee360aA6BF6C70F3ee" 