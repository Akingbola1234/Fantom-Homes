// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

error FantomHome_PropertyListed();

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

        require(property.isForSale, "Property not available for sale");
        require(msg.value >= property.price, "Insufficient payment");

        // Transfer Ownership
        address payable buyer = payable(msg.sender);
        address payable agent = payable(property.agent);
        (bool sent, ) = agent.call{value: msg.value}("");
        require(sent, "Failed to sent price");

        // Update property details
        property.agent = buyer;
        property.isForSale = false;

        emit PropertyPurchased(_propertyId, property.price, buyer);
    }
}
