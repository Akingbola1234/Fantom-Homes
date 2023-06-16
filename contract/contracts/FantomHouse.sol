// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

/**
 * @title Fantom House
 * @author Olusanya Ayodeji
 * @notice This is a contract for a Real Estate Sales
 */
contract FantomHouse {
    struct Property {
        uint propertyId;
        address agent;
        string propertyAddress;
        uint price;
        bool isForSale;
    }

    mapping(uint => Property) public properties;

    event PropertyPurchased(
        uint indexed _propertyId,
        uint indexed price,
        address indexed buyer
    );

    constructor() {}

    function listProperty(
        uint _propertyId,
        string memory _propertyAddress,
        uint _price
    ) public {
        require(!properties[_propertyId].isForSale, "Property Already listed");

        Property memory newproperty = Property({
            propertyId: _propertyId,
            agent: msg.sender,
            propertyAddress: _propertyAddress,
            price: _price,
            isForSale: true
        });

        properties[_propertyId] = newproperty;
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
