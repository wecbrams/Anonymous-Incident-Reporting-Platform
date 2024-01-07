const kit = require('@celo/contractkit');
const contract = require('./AnonymousIncidentReporting.json'); // Adjust path accordingly

// Set up ContractKit
const kitInstance = kit.newKit('https://alfajores-forno.celo-testnet.org');
kitInstance.addAccount(process.env.PRIVATE_KEY);

// Get the deployed contract instance
const incidentReportingContract = new kitInstance.web3.eth.Contract(contract.abi, '0x1234567890123456789012345678901234567890'); // Replace with your contract address

// Function to submit an incident report
async function submitIncidentReport() {
    const incidentMessage = document.getElementById('incidentMessage').value;
    
    try {
        // Call the smart contract function to submit an incident report
        const transaction = await incidentReportingContract.methods.submitIncidentReport(incidentMessage).send({
            from: kitInstance.defaultAccount,
            gas: 500000,
        });

        console.log('Incident report submitted. Transaction Hash:', transaction.transactionHash);
    } catch (error) {
        console.error('Error submitting incident report:', error);
    }
}

// Function to get the decrypted report
async function getDecryptedReport() {
    const reportId = document.getElementById('reportId').value;

    try {
        // Call the smart contract function to get the decrypted report
        const decryptedReport = await incidentReportingContract.methods.getDecryptedReport(reportId).call();

        // Display the decrypted report on the webpage
        document.getElementById('decryptedReport').innerText = `Decrypted Report: ${decryptedReport}`;
    } catch (error) {
        console.error('Error getting decrypted report:', error);
    }
}

// Example of improved error handling
try {
    // Attempt to submit an incident report
    submitIncidentReport();
} catch (error) {
    // Handle errors by displaying meaningful messages to the user
    console.error("Failed to submit incident report:", error.message);
}

try {
    // Attempt to get a decrypted report
    getDecryptedReport();
} catch (error) {
    // Handle errors by displaying meaningful messages to the user
    console.error("Failed to get decrypted report:", error.message);
}
