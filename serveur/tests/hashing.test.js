// Testez les fonctions de hachage dans serveur\hashing.test.js :
const { encodeRSAOAEP, decodeRSAOAEP, generateKeyPairRSA } = require('../hashing');

test('RSAES-OAEP', () => {
    const { publicKey, privateKey } = generateKeyPairRSA();
    const plaintext = 'Hello World!';
    const ciphertext = encodeRSAOAEP(plaintext, publicKey);
    const decoded = decodeRSAOAEP(ciphertext, privateKey);
    expect(decoded).toBe(plaintext);
});
