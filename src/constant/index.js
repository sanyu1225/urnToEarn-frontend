import { gql } from 'urql';

const CONTRACT_ADDR = process.env.REACT_CONTRACT_ADDRESS || '0xd640a1d7f3e7236a7aa95fa6e9a69531ad3c88ee9601b8a4afabe73d25b48508';

export const CREATOR_ADDRESS = process.env.REACT_CREATOR_ADDRESS || '0x407cb892bb8e0b71c46f0f04a852d1b4e8ad8433f368814383482059b0401c3f';

export default CONTRACT_ADDR;

export const queryAltarData = gql`
    query CurrentTokens($address: String, $creator_address: String) {
        current_token_ownerships(
            where: {
                owner_address: { _eq: $address }
                amount: { _gt: "0" }
                table_type: { _eq: "0x3::token::TokenStore" }
                current_token_data: { name: {} }
                collection_name: { _eq: "urn" }
                creator_address: { _eq: $creator_address }
            }
        ) {
            token_data_id_hash
            name
            collection_name
            property_version
            amount
            token_properties
            # default_properties
            current_token_data {
                ...TokenDataFields
            }
        }
    }
    fragment TokenDataFields on current_token_datas {
        creator_address
        collection_name
        description
        metadata_uri
        name
        token_data_id_hash
        collection_data_id_hash
        default_properties
    }
`;

export const queryShovelData = gql`
    query CurrentTokens($address: String, $creator_address: String) {
        current_token_ownerships(
            where: {
                owner_address: { _eq: $address }
                amount: { _gt: "0" }
                table_type: { _eq: "0x3::token::TokenStore" }
                current_token_data: { name: { _eq: "shovel" } }
                collection_name: { _eq: "urn" }
                creator_address: { _eq: $creator_address }
            }
        ) {
            token_data_id_hash
            name
            collection_name
            property_version
            amount
            token_properties
            # default_properties
            current_token_data {
                ...TokenDataFields
            }
        }
    }
    fragment TokenDataFields on current_token_datas {
        creator_address
        collection_name
        description
        metadata_uri
        name
        token_data_id_hash
        collection_data_id_hash
        default_properties
    }
`;

export const getItemQuery = (item) => gql`
    query CurrentTokens($address: String, $creator_address: String) {
        current_token_ownerships(
            where: {
                owner_address: { _eq: $address }
                amount: { _gt: "0" }
                table_type: { _eq: "0x3::token::TokenStore" }
                current_token_data: { name: { _eq: "${item}" } }
                collection_name: { _eq: "urn" }
                creator_address: { _eq: $creator_address }
            }
        ) {
            token_data_id_hash
            name
            collection_name
            property_version
            amount
            token_properties
            # default_properties
            current_token_data {
                ...TokenDataFields
            }
        }
    }
    fragment TokenDataFields on current_token_datas {
        creator_address
        collection_name
        description
        metadata_uri
        name
        token_data_id_hash
        collection_data_id_hash
        default_properties
    }
`;

export const queryAllUrnData = gql`
    query CurrentTokens($address: String, $creator_address: String) {
        current_token_ownerships(
            where: {
                owner_address: { _eq: $address }
                amount: { _gt: "0" }
                table_type: { _eq: "0x3::token::TokenStore" }
                current_token_data: { name: { _in: ["urn", "golden_urn"] } }
                collection_name: { _eq: "urn" }
                creator_address: { _eq: $creator_address }
            }
        ) {
            token_data_id_hash
            name
            collection_name
            property_version
            amount
            token_properties
            # default_properties
            current_token_data {
                ...TokenDataFields
            }
        }
    }
    fragment TokenDataFields on current_token_datas {
        creator_address
        collection_name
        description
        metadata_uri
        name
        token_data_id_hash
        collection_data_id_hash
        default_properties
    }
`;
