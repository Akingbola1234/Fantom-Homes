// // SPDX-License-Identifier: SEE LICENSE IN LICENSE
// pragma solidity ^0.8.18;

// error FantomHome_PropertyListed();
// error FantomHome_PropertyNotAvailable();
// error FantomHome_InsufficientPayment();
// error FantomHome_FailedToSendPrice();
// error FantomHome_OnlyBuyer();
// error FantomHome_OnlySeller();
// error FantomHome_NotAllowed();

// contract FantomHome {
//     // Declaring the state variables
//     enum State {
//         await_payment,
//         await_delivery,
//         complete
//     }

//     // Declaring the Property parameters
//     struct Property {
//         uint propertyId;
//         address agent;
//         string propertyAddress;
//         string documents;
//         uint price;
//         bool isForSale;
//     }

//     // Declaring the traders parameters
//     struct Traders {
//         address payable seller;
//         address payable buyer;
//     }

//     // Declaring sellers profile
//     struct SellerProfile {
//         address seller;
//         uint numOfProperties;
//         uint successTransactions;
//         uint failedTransactions;
//     }
//     // Declaring the state variables
//     uint public s_numProperties = 1;

//     // Declaring mapping property
//     mapping(uint => Property) public properties;
//     mapping(uint => Traders) public traders;
//     mapping(uint => State) public states;
//     mapping(address => SellerProfile) public sellerProfiles;

//     // Declaring the object of the numerato
//     State private state;

//     // Declaring events
//     event PropertyListed(
//         uint indexed _propertyId,
//         uint indexed price,
//         string indexed propertyAddress,
//         string documents
//     );

//     event PropertyPurchased(
//         uint indexed _propertyId,
//         uint indexed price,
//         address indexed buyer
//     );

//     constructor() {}

//     // Defining function modifier 'instate'
//     modifier instate(State expected_state, uint _propertyId) {
//         if (states[_propertyId] == expected_state) {
//             _;
//         } else {
//             revert FantomHome_NotAllowed();
//         }
//     }

//     // Defining function modifier 'onlyBuyer'
//     modifier onlyBuyer(address _buyer, uint id) {
//         if (msg.sender == traders[id].buyer) {
//             _;
//         } else {
//             revert FantomHome_OnlyBuyer();
//         }
//     }

//     // Defining function modifier 'onlySeller'
//     modifier onlySeller(address _seller, uint id) {
//         if (msg.sender == traders[id].seller) {
//             _;
//         } else {
//             revert FantomHome_OnlySeller();
//         }
//     }

//     function listProperty(
//         string memory _propertyAddress,
//         uint _price,
//         string memory _documents
//     ) public {
//         if (properties[s_numProperties].isForSale) {
//             revert FantomHome_PropertyListed();
//         }

//         Property memory newproperty = Property({
//             propertyId: s_numProperties,
//             agent: msg.sender,
//             propertyAddress: _propertyAddress,
//             documents: _documents,
//             price: _price,
//             isForSale: true
//         });

//         properties[s_numProperties] = newproperty;

//         state = State.await_payment;
//         states[s_numProperties] = state;

//         traders[s_numProperties].seller = payable(msg.sender);
//         if (containsSeller()) {
//             sellerProfiles[msg.sender].seller = msg.sender;
//             sellerProfiles[msg.sender].numOfProperties++;
//         } else {
//             sellerProfiles[msg.sender].numOfProperties++;
//         }

//         emit PropertyListed(
//             s_numProperties,
//             _price,
//             _propertyAddress,
//             _documents
//         );
//         s_numProperties++;
//     }

//     // Defining function to purchase property;
//     function purchaseProperty(
//         uint _propertyId // await.payment
//     ) public payable instate(State.await_payment, _propertyId) {
//         Property storage property = properties[_propertyId];

//         if (!property.isForSale) {
//             revert FantomHome_PropertyNotAvailable();
//         }
//         if (msg.value < property.price) {
//             revert FantomHome_InsufficientPayment();
//         }

//         // Transfer Ownership
//         traders[_propertyId].buyer = payable(msg.sender);

//         state = State.await_delivery;
//         states[_propertyId] = state;

//         emit PropertyPurchased(
//             _propertyId,
//             property.price,
//             traders[_propertyId].buyer
//         );
//     }

//     // Defining function to confrim delivery
//     function confirm_delivery(
//         uint _propertyId
//     )
//         public
//         onlyBuyer(msg.sender, _propertyId)
//         instate(State.await_delivery, _propertyId)
//     {
//         Property storage property = properties[_propertyId];
//         uint price = property.price;

//         address payable seller = traders[_propertyId].seller;

//         (bool sent, ) = seller.call{value: price}("");
//         if (!sent) {
//             revert FantomHome_FailedToSendPrice();
//         }

//         // Update property details
//         property.agent = traders[_propertyId].buyer;
//         property.isForSale = false;

//         state = State.complete;
//         states[_propertyId] = state;

//         sellerProfiles[seller].successTransactions++;
//     }

//     //Defining function to return payment
//     function ReturnPayment(
//         uint _propertyId
//     )
//         public
//         onlySeller(msg.sender, _propertyId)
//         instate(State.await_delivery, _propertyId)
//     {
//         Property storage property = properties[_propertyId];
//         uint price = property.price;
//         address seller = traders[_propertyId].seller;
//         (bool sent, ) = traders[_propertyId].buyer.call{value: price}("");
//         if (!sent) {
//             revert FantomHome_FailedToSendPrice();
//         }

//         sellerProfiles[seller].failedTransactions++;
//     }

//     function containsSeller() internal view returns (bool) {
//         return sellerProfiles[msg.sender].seller == address(0);
//     }

//     // Views/Pure Functions

//     // function getProperties() public view {
//     //     for (uint i = 1; i <= s_numProperties; i++) {

//     //     }
//     // }
// }
