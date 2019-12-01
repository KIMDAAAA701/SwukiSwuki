var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/3076f20b5a224a4aa63b7a3b79d48cf2"));//infuraAPI키
var Tx = require('ethereumjs-tx').Transaction;

const send_account    = "0x09C68b794CECFae11Ae5925AC356367D54B6e079"; //송신자 주소
const receive_account = "0x09C68b794CECFae11Ae5925AC356367D54B6e079"; //수신자 주소
const privateKey = Buffer.from('1A2A1960E48CFDF1CFD3785010015A62A152F8010BA40313366CC3D24DAC19E5', 'hex'); //private키

router.get('/', function(req, res, next) {
  res.render("Ether"); //응답할 ejs
});

router.post('/', function(req, res, next){
  web3.eth.getTransactionCount(send_account, (err, txCount) => {

  const txObject = {
    nonce:    web3.utils.toHex(txCount), //EOA에 발급되는 트랜잭션 일련번호(트랜잭션의 중복전송 방지 )
    gasLimit: web3.utils.toHex(1000000), //가스의 최대 용량
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')), //가스 가격
    to: receive_account, //수신자 주소
    value :  '0x2386f26fc10000', //0.01이더 전송 to_hex
    chainId: 3, //ropsten
    data: 0xffffffffff //EVM에 의해 함수 호출로 해석되고 data에 지정된 함수가 호출됨
  };

  const tx = new Tx(txObject, {'chain':'ropsten'});

  tx.sign(privateKey);

  const serializedTx = tx.serialize();
  const raw = '0x' + serializedTx.toString('hex');

  web3.eth.sendSignedTransaction(raw)
     .once('transactionHash', (hash) => {
       console.info('transactionHash', 'https://ropsten.etherscan.io/tx/' + hash);
     })
     .once('receipt', (receipt) => {
       console.info('receipt', receipt);
    }).on('error', console.error);
  });

  res.redirect("/Ether"); //응답할 url
});

module.exports = router;
