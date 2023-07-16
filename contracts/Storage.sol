// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;

contract Storage {
    mapping (uint256 => uint256) store;
    event DataStored(uint256 data, uint256 time);

    /**
     * Store 32 bytes of data onto the blockchain.
     * User is responsible for the uniqueness of their data.
     * User is encouraged to preprocess raw data by adding information
     * including and not limited to timestamp, author, and a randomly
     * generated nonce and re-hashing to generate a new 32-byte _data
     * Note: All original data need to be stored so that you can verify
     * their existence later.
     *
     * @param _data A uint256 representing a 32-byte chunk of data to be stored
     */
    function put(uint256 _data) public {
        require(store[_data] == 0, 'Data already stored');
        store[_data] = block.timestamp;
        emit DataStored(_data, block.timestamp);
    }

    /**
     * Return the time stamp at which the data is stored on the blockchain
     * @param _data A uint256 representing a 32-byte chunk of data to be checked
     * @return Timestamp at which _data became stored onto the block chain
     */
    function get(uint256 _data) public view returns (uint256) {
        require(store[_data] != 0, 'Data not yet stored');
        return store[_data];
    }
}
