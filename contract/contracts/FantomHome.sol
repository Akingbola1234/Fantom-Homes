// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

error FantomHome_PropertyListed();
error FantomHome_PropertyNotAvailable();
error FantomHome_InsufficientPayment();
error FantomHome_FailedToSendPrice();
error FantomHome_OnlyBuyer();
error FantomHome_OnlySeller();
error FantomHome_NotAllowed();

contract FantomHome {
    // Declaring the state variables
    enum State {
        await_payment,
        await_delivery,
        complete
    }

    // Declaring the Property parameters
    struct Property {
        uint propertyId;
        address agent;
        string propertyAddress;
        string documents;
        uint price;
        bool isForSale;
    }

    // Declaring the traders parameters
    struct Traders {
        address payable seller;
        address payable buyer;
    }
    // Declaring the state variables
    address payable public s_buyer;
    address payable public s_arbiter;
    address payable public s_seller;
    uint public propertyId;

    // Declaring mapping property
    mapping(uint => Property) public properties;
    mapping(uint => Traders) private traders;
    mapping(uint => State) states;

    // Declaring the object of the numerato
    State public state;

    // Declaring events
    event PropertyListed(
        uint indexed _propertyId,
        uint indexed price,
        string indexed propertyAddress,
        string documents
    );
    event PropertyPurchased(
        uint indexed _propertyId,
        uint indexed price,
        address indexed buyer
    );

    constructor() {
        s_arbiter = payable(address(this));
    }

    // Defining function modifier 'instate'
    modifier instate(State expected_state, uint _propertyId) {
        if (states[_propertyId] == expected_state) {
            _;
        } else {
            revert FantomHome_NotAllowed();
        }
    }

    // Defining function modifier 'onlyBuyer'
    modifier onlyBuyer(address _buyer, uint id) {
        if (msg.sender == traders[id].buyer) {
            _;
        } else {
            revert FantomHome_OnlyBuyer();
        }
    }

    // Defining function modifier 'onlySeller'
    modifier onlySeller(address _seller, uint id) {
        if (msg.sender == traders[id].seller) {
            _;
        } else {
            revert FantomHome_OnlySeller();
        }
    }

    function listProperty(
        uint _propertyId,
        string memory _propertyAddress,
        uint _price,
        string memory _documents
    ) public {
        if (properties[_propertyId].isForSale) {
            revert FantomHome_PropertyListed();
        }

        Property memory newproperty = Property({
            propertyId: _propertyId,
            agent: msg.sender,
            propertyAddress: _propertyAddress,
            documents: _documents,
            price: _price,
            isForSale: true
        });

        properties[_propertyId] = newproperty;

        s_seller = payable(msg.sender);
        state = State.await_payment;
        states[_propertyId] = state;

        traders[_propertyId].seller = payable(msg.sender);

        emit PropertyListed(_propertyId, _price, _propertyAddress, _documents);
    }

    // Defining function to purchase property;
    function purchaseProperty(
        uint _propertyId // await.payment
    ) public payable instate(State.await_payment, _propertyId) {
        Property storage property = properties[_propertyId];

        if (!property.isForSale) {
            revert FantomHome_PropertyNotAvailable();
        }
        if (msg.value < property.price) {
            revert FantomHome_InsufficientPayment();
        }

        // Transfer Ownership
        s_buyer = payable(msg.sender);
        traders[_propertyId].buyer = payable(msg.sender);
        propertyId = _propertyId;

        state = State.await_delivery;
        states[_propertyId] = state;

        emit PropertyPurchased(_propertyId, property.price, s_buyer);
    }

    // Defining function to confrim delivery
    function confirm_delivery(
        uint _propertyId
    )
        public
        onlyBuyer(msg.sender, _propertyId)
        instate(State.await_delivery, _propertyId)
    {
        Property storage property = properties[propertyId];
        uint price = property.price;
        (bool sent, ) = s_seller.call{value: price}("");
        if (!sent) {
            revert FantomHome_FailedToSendPrice();
        }

        // Update property details
        property.agent = s_buyer;
        property.isForSale = false;
        state = State.complete;
        states[_propertyId] = state;
    }

    //Defining function to return payment
    function ReturnPayment(
        uint _propertyId
    )
        public
        onlySeller(msg.sender, _propertyId)
        instate(State.await_delivery, _propertyId)
    {
        Property storage property = properties[propertyId];
        uint price = property.price;
        (bool sent, ) = s_buyer.call{value: price}("");
        if (!sent) {
            revert FantomHome_FailedToSendPrice();
        }
    }
}
