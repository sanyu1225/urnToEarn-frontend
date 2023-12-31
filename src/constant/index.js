import { gql } from 'urql';

const CONTRACT_ADDR = process.env.REACT_CONTRACT_ADDRESS || '0xda0cd74d3815ed8e319a97c1e8ff9e162aac4ac6d7a1bbc6ef614f7892d11ede';

export const CREATOR_ADDRESS = process.env.REACT_CREATOR_ADDRESS || '0xae4afe63b071afc23f808bb46b17c4329617121aa00ae1f155f853916cd4c2fc';

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
