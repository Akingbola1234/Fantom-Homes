// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

contract Escrow {
    // Declaring the state variables
    address payable public buyer;
    address payable public seller;
    address payable public arbiter;

    // Defining a enumerator 'State'

    enum State {
        // Following are the data member
        await_payment,
        await_delivery,
        complete
    }

    // Declaring the object of the enumerator
    State public state;

    // Defining function modifier 'instate'
    modifier instate(State expected_state) {
        require(state == expected_state);
        _;
    }

    // Defining function modifier 'onlyBuyer'
    modifier onlyBuyer() {
        require(msg.sender == buyer);
        _;
    }

    // Defining function modifier 'onlySeller'
    modifier onlySeller() {
        require(msg.sender == seller);
        _;
    }

    // Defining a constructor
    constructor(address payable _buyer, address payable _seller) {
        arbiter = payable(msg.sender);
        buyer = _buyer;
        seller = _seller;
        state = State.await_payment;
    }

    // Defining function to confirm payment
    function confirm_payment()
        public
        payable
        onlyBuyer
        instate(State.await_payment)
    {
        state = State.await_delivery;
    }

    // Defining function to confirm delivery
    function confirm_delivery() public onlyBuyer instate(State.await_delivery) {
        seller.transfer(address(this).balance);
        state = State.complete;
    }

    function ReturnPayment() public onlySeller instate(State.await_delivery) {
        buyer.transfer(address(this).balance);
    }
}
