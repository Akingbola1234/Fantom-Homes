// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

error FantomHome_PropertyListed();
error FantomHome_PropertyNotAvailable();
error FantomHome_InsufficientPayment();
error FantomHome_FailedToSendPrice();

contract FantomHome {
    struct Property {
        uint propertyId;
        address agent;
        string propertyAddress;
        string documents;
        uint price;
        bool isForSale;
    }

    mapping(uint => Property) public properties;

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

    constructor() {}

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

        emit PropertyListed(_propertyId, _price, _propertyAddress, _documents);
    }

    function purchaseProperty(uint _propertyId) public payable {
        Property storage property = properties[_propertyId];

        if (!property.isForSale) {
            revert FantomHome_PropertyNotAvailable();
        }
        if (msg.value < property.price) {
            revert FantomHome_InsufficientPayment();
        }

        // Transfer Ownership
        address payable buyer = payable(msg.sender);
        address payable agent = payable(property.agent);
        (bool sent, ) = agent.call{value: msg.value}("");
        if (!sent) {
            revert FantomHome_FailedToSendPrice();
        }

        // Update property details
        property.agent = buyer;
        property.isForSale = false;

        emit PropertyPurchased(_propertyId, property.price, buyer);
    }
}
