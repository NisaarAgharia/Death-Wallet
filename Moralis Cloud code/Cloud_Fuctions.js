

Moralis.Cloud.define("checkDeathUser", async (request) => {
    const logger = Moralis.Cloud.getLogger();
    // Get list of all users
    const query = new Moralis.Query('User');
    const results = await query.find({ useMasterKey: true });
    logger.info("Length of address :- " + results.length);
    let address = [];
    for (let i = 0; i < results.length; ++i) {
        address.push(results[i].get("ethAddress"))
        logger.info("*********************START************************************")
        let curretAddress = results[i].get("ethAddress");
        logger.info("currentUser  :- " + curretAddress);
        const queryEth = new Moralis.Query('EthTokenTransfers');
        queryEth.equalTo("from_address", curretAddress);
        const resultEth = await queryEth.find({ useMasterKey: true });
        logger.info("resultEth " + resultEth);

        let tokens = [];
        let data = [];
        const now = Date.now(); // Unix timestamp in milliseconds

        for (let j = 0; j < resultEth.length; ++j) {
            // const createdAt = resultEth[j].createdAt;
            const updatedAt = resultEth[j].updatedAt.getTime();
            tokens.push(updatedAt)
            // logger.info(tokens.toString)
        }

        const queryNFT = new Moralis.Query('EthNFTTransfers');
        queryNFT.equalTo("from_address", curretAddress);
        const resultNFT = await queryNFT.find({ useMasterKey: true });
        logger.info("resultNFT " + resultNFT)

        let nfts = [];
        for (let k = 0; k < resultNFT.length; ++k) {
            const updatedAt = resultNFT[k].updatedAt.getTime();
            nfts.push(updatedAt)
        }

        data = tokens.concat(nfts);
        logger.info("All EPOCHE TIME :- " + data + "for Given ID " + curretAddress);

        const recentRecord = Math.max(...data)
        logger.info("Recent Transaction time  ---  " + recentRecord)
        logger.info("Now  " + now)
        if (now - recentRecord < 31556926000) {
            logger.info("Inactive User find for ID " + curretAddress)
            // Insert the data in DB
            const queryUserNomineeDetails = new Moralis.Query('UserNomineeDetails');
            queryUserNomineeDetails.equalTo("curretAddress", curretAddress);
            const userNomineeDetails = await queryUserNomineeDetails.find({ useMasterKey: true });
            logger.info("userNomineeDetails details  " + JSON.stringify(userNomineeDetails));
            logger.info("userNomineeDetails lengh " + userNomineeDetails.length);
            for (let q = 0; q < userNomineeDetails.length; ++q) {
                const Monster = Moralis.Object.extend("Monster");
                let monster = userNomineeDetails[q];
                logger.info("Monsters " + JSON.stringify(monster));
                monster.save().then((monster) => {
                    monster.set("status", "DEAD");
                    return monster.save();
                });
            }
        }
        logger.info("***********************END**********************************");
    }
    return "Sucess";
});


Moralis.Cloud.job("runCheckDeathUser", (request) => {
    const run = async () => await Moralis.Cloud.run("checkDeathUser", {})
    return run()
});
