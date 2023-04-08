import axios from "axios";

const pinataApiKey = process.env.REACT_APP_PINATA_KEY;
const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET;


export const uploadJSONToPinata = async (data) => {
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
  const response = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
      'pinata_api_key': pinataApiKey,
      'pinata_secret_api_key': pinataSecretApiKey,
    },
  });
  return response.data.IpfsHash;
};

export const getJSONFromPinata = async (hash) => {
  const url = `https://gateway.pinata.cloud/ipfs/${hash}`;
  const response = await axios.get(url);
  return response.data;
};


