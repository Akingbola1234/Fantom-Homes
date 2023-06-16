// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

error FantomHome_PropertyListed();
error FantomHome_PropertyNotAvailable();
error FantomHome_InsufficientPayment();
error FantomHome_FailedToSendPrice();

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
    // Declaring the state variables
    address payable public s_buyer;
    address payable public s_arbiter;
    address payable public s_seller;
    uint public propertyId;

    // Declaring mapping property
    mapping(uint => Property) public properties;

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
        state = State.await_payment;
    }

    // Defining function modifier 'instate'
    modifier instate(State expected_state) {
        require(state == expected_state);
        _;
    }

    // Defining function modifier 'onlyBuyer'
    modifier onlyBuyer(address _buyer) {
        require(msg.sender == _buyer);
        _;
    }

    // Defining function modifier 'onlySeller'
    modifier onlySeller(address _seller) {
        require(msg.sender == _seller);
        _;
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

        emit PropertyListed(_propertyId, _price, _propertyAddress, _documents);
    }

    // Defining function to purchase property;
    function purchaseProperty(
        uint _propertyId
    ) public payable onlyBuyer(msg.sender) instate(State.await_payment) {
        Property storage property = properties[_propertyId];

        if (!property.isForSale) {
            revert FantomHome_PropertyNotAvailable();
        }
        if (msg.value < property.price) {
            revert FantomHome_InsufficientPayment();
        }

        // Transfer Ownership
        s_buyer = payable(msg.sender);
        propertyId = _propertyId;

        state = State.await_delivery;

        emit PropertyPurchased(_propertyId, property.price, s_buyer);
    }

    // Defining function to confrim delivery
    function confirm_delivery()
        public
        onlyBuyer(s_buyer)
        instate(State.await_delivery)
    {
        Property storage property = properties[propertyId];
        address payable agent = payable(property.agent);
        (bool sent, ) = agent.call{value: address(this).balance}("");
        if (!sent) {
            revert FantomHome_FailedToSendPrice();
        }

        // Update property details
        property.agent = s_buyer;
        property.isForSale = false;
        state = State.complete;
    }

    //Defining function to return payment
    function ReturnPayment()
        public
        onlySeller(s_seller)
        instate(State.await_delivery)
    {
        (bool sent, ) = s_buyer.call{value: address(this).balance}("");
        if (!sent) {
            revert FantomHome_FailedToSendPrice();
        }
    }
}
