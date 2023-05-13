const functions = require("firebase-functions");
const cors = require('cors')({origin: true});

// micro provides http helpers
const { send, json } = require('micro');

const { Client, Environment } = require('square')
const { randomUUID } = require('crypto')
BigInt.prototype.toJSON = function() { return this.toString();}

const sendgrid = require('@sendgrid/mail');

const { SQUARE_API, SENDGRID_API} = require('./server/config');

const SENDGRID_API_KEY =  SENDGRID_API;
const SQUARE_ACCESS_TOKEN = SQUARE_API;


const {paymentsApi, catalogApi, ordersApi, calculateOrder, inventoryApi} = new Client({
  accessToken: SQUARE_ACCESS_TOKEN,
  environment: Environment.Production,
})

exports.pay = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try{
      if(req.method == 'POST'){

        //initializes the cart from the POST body
      var cartBody = req.body.cart;
  
      //shipping details
      var email = req.body.collectedInfo.email;
      var address = req.body.collectedInfo.address;
      var city = req.body.collectedInfo.city;
      var state = req.body.collectedInfo.state;
      var unit = req.body.collectedInfo.unit;
      var postal = req.body.collectedInfo.postal;
      var country = 'US';
      var firstlast = req.body.collectedInfo.name.split(" ");
      var first = firstlast[0];
      var last = firstlast[1];
      var sameBilling = req.body.collectedInfo.sameBilling;
      var testimonyNote = req.body.collectedInfo.testimony;

      //billing details
      var billingaddress = req.body.collectedInfo.billingaddress;
      var billingcity = req.body.collectedInfo.billingcity;
      var billingstate = req.body.collectedInfo.billingstate;
      var billingunit = req.body.collectedInfo.billingunit;
      var billingpostal = req.body.collectedInfo.billingpostal;
      var billingcountry = 'US';
      var billingfirstlast = req.body.collectedInfo.billingname.split(" ");
      var billingfirst = billingfirstlast[0];
      var billinglast = billingfirstlast[1];

      //initalizes the body of the calculate Total response
      let lineItemsObject = [];
      let fulfillmentsObject = [];
      var fulfillments_json = {};
      fulfillments_json['type'] = 'SHIPMENT';

      //generates the shipment fulfillment data
      var shipmentdetails_json = {};
      var recipient_json = {};
      recipient_json['displayName'] = first + ' ' + last;
      recipient_json['emailAddress'] = email;
      recipient_json['phoneNumber'] = '0000000000';

      var shippingaddress_json = {};
      shippingaddress_json['addressLine1'] = address;
      //adds the appartment number to the address line
      if(unit != '' && unit != null){
        shippingaddress_json['addressLine2'] = 'Unit ' + unit;
      }
      shippingaddress_json['postalCode'] = postal; 
      shippingaddress_json['firstName'] = first;
      shippingaddress_json['lastName'] = last;
      shippingaddress_json['locality'] = city;
      shippingaddress_json['administrativeDistrictLevel1'] = state;
      shippingaddress_json['country'] = country;

      recipient_json['address'] = shippingaddress_json;

      shipmentdetails_json['recipient'] = recipient_json;
      fulfillments_json['shipmentDetails'] = shipmentdetails_json;
      fulfillments_json['note'] = testimonyNote;

      fulfillmentsObject.push(fulfillments_json);

      // console.log(fulfillmentsObject);

      //iterates through the objects in the cart
      for(let i = 0; i < cartBody.length; i++){
        //adds the catalog item and quantity to the body of line items
        var lineItem_json = {};
        lineItem_json['quantity'] = cartBody[i].quantity.toString();
        lineItem_json['catalogObjectId'] = cartBody[i].catalogItemId.toString();

        lineItemsObject.push(lineItem_json);

      }


      //adds the flat shipping rate of $7.00 to every order as a service charge
      let flat_rate_shipping_charge_object = [];
      let flat_rate_shipping_charge_json = {};
      let shipping_amount_json = {};
      shipping_amount_json['amount'] = 700;
      shipping_amount_json['currency'] = 'USD';
      flat_rate_shipping_charge_json['amountMoney'] = shipping_amount_json;
      flat_rate_shipping_charge_json['name'] = "Shipping Fee"
      flat_rate_shipping_charge_json['calculationPhase'] = "TOTAL_PHASE";
      flat_rate_shipping_charge_object.push(flat_rate_shipping_charge_json);

      let pricingOptions_json = {};
      //auto applies sales tax of 6%
      pricingOptions_json['autoApplyTaxes'] = true;
      //auto applies discounts if they apply
      pricingOptions_json['autoApplyDiscounts'] = true;

      //calls calculate total with the specific catalog item ids, quantity, and shipment details
      const createOrderResponse = await ordersApi.createOrder({
        order: {
          locationId: 'LPDFAWR6C61AP',
          serviceCharges: flat_rate_shipping_charge_object,
          lineItems: lineItemsObject,
          pricingOptions:  pricingOptions_json,
          fulfillments: fulfillmentsObject
        }
      });


      //because of promises, to be able to read to response body, you have to first convert the response to json, then access the result
      let order = createOrderResponse.result;
      let total = Number(order.order.totalMoney.amount);
      let orderId = order.order.id;

      //if billing information is the same as shipping information
      if(sameBilling){
        billingaddress = address;
        billingcity = city;
        billingstate = state;
        billingpostal = postal;
        billingcountry = 'US';

        billingfirst = first;
        billinglast = last;
        billingunit = unit;
      }

      //pays for the created order above
        const {result, statusCode} = await paymentsApi.createPayment({
          idempotencyKey: randomUUID(),
          sourceId: req.body.sourceId,
          amountMoney: {
            currency: 'USD',
            amount: total.toString(),
          },
          orderId: orderId,
          buyerEmailAddress: email,
          billingAddress: {
            addressLine1: billingaddress,
            addressLine2: 'Unit ' + billingunit,
            locality: billingcity,
            administrativeDistrictLevel1: billingstate,
            postalCode: billingpostal,
            country: billingcountry,
            firstName: billingfirst,
            lastName: billingfirst
          },
        })

        //attemps to send an email recepit to the sender
        sendgrid.setApiKey(SENDGRID_API_KEY);
        try{
          const body = '<h3>Hey there!!</h3></br><p>Thank you so much for your purchase and for being part of the Vessels Clothing family.</p></br><p>Receipt Url: ' + result.payment.receiptUrl + '</p></br><p>The tracking number for your purchase will be sent to your email once your order has been shipped. ✈️ ALSO do not forget to tag us on Instagram: @vessels.co with your latest Vessels purchase for a chance to be reposted and also to be featured on our website🔥</p></br><p>We could not do what we do without your support🙌 May the Lord bless you and keep you, may his face shine upon you, cover you, and give you peace🙏</p></br><p>Thank you,</p><p>Vessels Clothing Co.</p>';
          //only send the email on a completed order
          if(result.payment.status == 'COMPLETED'){
            const msg = {
              to: email,
            // Change to your recipient
              from: 'vesselsclothingorders@gmail.com',
            // Change to your verified sender
              subject: 'Vessels Order!',
              html:  body,
          }
          sendgrid
              .send(msg)
              .then((resp) => {
                console.log('Email sent\n', resp)
              })
          }
        }
        catch(error){
          console.log(error);
        }

        //attemps to send an email to vincent that an order was recieved
        sendgrid.setApiKey(SENDGRID_API_KEY);
        try{
          const body = '<p>An order was recieved on the website from ' + first + ' ' + last + '! Check the square dashboard for more info.</p>' + '</br><p>Receipt Url: ' + result.payment.receiptUrl + '</p>' + '<p>What is God Doing in Your Life?</p><p>"' + testimonyNote + '"</p>' + '<p>Shipping Information: ' + address + ' ' + city +  ', ' + state + ' US' + '</p><p>Contact Information: ' + email +  '</p>';
          //only send the email on a completed order
          if(result.payment.status == 'COMPLETED'){
            const msg = {
              to: 'vpvessels@gmail.com',
            // Change to your recipient
              from: 'vesselsclothingorders@gmail.com',
            // Change to your verified sender
              subject: 'Vessels Order From Website!',
              html:  body,
          }
          sendgrid
              .send(msg)
              .then((resp) => {
                console.log('Email sent\n', resp)
              })
          }
        }
        catch(error){
          console.log(error);
        }

        send(res, statusCode, {
          success: true,
          payment: {
            id: result.payment.id,
            status: result.payment.status,
            receiptUrl: result.payment.receiptUrl,
            orderId: result.payment.orderId,
          },
        });
      }
    }
    catch(error){
      console.log(error)
      send(res, 500, {
        success: false,
        error: error,
      });
    }
  });
});

exports.calculateTotal = functions.https.onRequest((req, res) => {
  cors(req, res, async () =>{
    try{
      //initializes the cart from the POST body
      var cartBody = req.body;

      //initalizes the body of the calculate Total response
      let lineItemsObject = [];

      //iterates through the objects in the cart
      for(let i = 0; i < cartBody.length; i++){
        //adds the catalog item and quantity to the body of line items
        var lineItem_json = {};
        lineItem_json['quantity'] = cartBody[i].quantity.toString();
        lineItem_json['catalogObjectId'] = cartBody[i].catalogItemId.toString();

        lineItemsObject.push(lineItem_json);

      }

      // console.log(lineItemsObject);

      let pricingOptions_json = {};
      //auto applies sales tax of 6%
      pricingOptions_json['autoApplyTaxes'] = true;
      //auto applies discounts if they apply
      pricingOptions_json['autoApplyDiscounts'] = true;

      //calls calculate total with the specific catalog item ids and quantity
      const {result, statusCode} = await ordersApi.calculateOrder({
        order: {
          locationId: 'LPDFAWR6C61AP',
          lineItems: lineItemsObject,
          pricingOptions: pricingOptions_json,
        }
      });

      send(res, statusCode, {
        success: true,
        result: result,
      });
  } catch(error) {
    console.log(error)
    res.sendStatus(500);
  }
  });
});

exports.getCatalogItemId = functions.https.onRequest((req, res) => {
  cors(req, res, async () =>{
    const body = req.body;

    //gets the sku from the item in the cart
    const sku = body.id;

    try{
      //searches to see if this product exists
      const {result, statusCode} = await catalogApi.searchCatalogItems({
        textFilter: sku
      });

      //gets the catalog item id associated with the specific sku
      //note: this should only return 1 matched id
      if(!result.matchedVariationIds){
        throw 'No Matched SKUs Found'
      }
      else if(result.matchedVariationIds.length > 1){
        throw 'Multiple SKUs Matches Found'
      }

      //gets the only matched sku item from the json
      var variationItemId = result.matchedVariationIds[0];

      send(res, statusCode, {
        success: true,
        result: variationItemId,
      });
    }
    catch(error){
      console.log(error)
      send(res, 500, {
        success: false,
        result: error,
      });
    }
  });
})

exports.getAllCatalogItemIds = functions.https.onRequest((req, res) => {
  cors(req, res, async () =>{
    const body = req.body;

    //gets the sku from the item in the cart
    const baseSKU = body.id;

    try{
      //searches to see if this product exists
      const {result, statusCode} = await catalogApi.searchCatalogItems({
        textFilter: baseSKU.toString()
      });

      //gets the catalog item id associated with the specific sku
      //note: this should only return 1 matched id
      if(!result.matchedVariationIds){
        throw 'No Matched SKUs Found'
      }

      //gets the only matched sku item from the json
      //iterates through the variations and puts catalogItemId in order of s,m,l,xl
      var variationItemIds = []
      for(let i = 0; i < result.items[0].itemData.variations.length; i++){
        //this if statement is to account for products that have multiple colors
        if(result.items[0].itemData.variations[i].itemVariationData.sku.includes(baseSKU)){
          //pushing should be completely fine bc reading the product variation data has the product in order s,m,l,xl
          variationItemIds.push(result.items[0].itemData.variations[i].id);
        }
      }
      // console.log(variationItemIds);


      send(res, statusCode, {
        success: true,
        result: variationItemIds,
      });
    }
    catch(error){
      console.log(error)
      send(res, 500, {
        success: false,
        result: error,
      });
    }
  });
})

exports.getInventory = functions.https.onRequest((req, res) => {
  cors(req, res, async () =>{
    const body = req.body;

    let ids = body.ids;

    console.log(ids);

    try {
      //initializes inventory object in s,m,l,xl order
      let inventory = [
        {
          id: ids[0],
          quantity: '0'
        },
        {
          id: ids[1],
          quantity: '0'
        },
        {
          id: ids[2],
          quantity: '0'
        },
        {
          id: ids[3],
          quantity: '0'
        },
        {
          id: ids[4],
          quantity: '0'
        }

      ];
      
      const {result} = await inventoryApi.batchRetrieveInventoryCounts({
        catalogObjectIds: ids,
        locationId: 'LPDFAWR6C61AP',
      });

      console.log(result);

      if(result.counts){
        //maps the returned counts array to the inventory array

        //have to specify the location id to make sure that we are looking specifically at the quantity for that location in square
        for(let i = 0; i < inventory.length; i++){
          let found = result.counts.find(item => item.catalogObjectId == inventory[i].id && item.locationId == 'LPDFAWR6C61AP');
          console.log(found);
          //if the item was not found, keep the quanitiy as 0
          if(found){
            inventory[i].quantity = found.quantity;
          }
        }
      }
      
      send(res, 200, {
        success: true,
        result: inventory,
      });
    } catch(error) {
      console.log(error)
      send(res, 500, {
        success: false,
        result: error,
      });
    }
  });
})

exports.getSingleStock = functions.https.onRequest((req, res) => {
  cors(req, res, async () =>{
    const body = req.body;

    let id = [body.id];

    console.log(id);

    try {
      //initializes inventory object in s,m,l,xl order
      let inventory = [
        {
          id: id,
          quantity: '0'
        }
      ];
      
      const {result} = await inventoryApi.batchRetrieveInventoryCounts({
        catalogObjectIds: id,
        locationId: 'LPDFAWR6C61AP',
      });

      console.log(result);

      if(result.counts){
        //maps the returned counts array to the inventory array
        for(let i = 0; i < inventory.length; i++){
          //have to specify the location id to make sure that we are looking specifically at the quantity for that location in square
          let found = result.counts.find(item => item.catalogObjectId == inventory[i].id && item.locationId == 'LPDFAWR6C61AP');
          //if the item was not found, keep the quanitiy as 0
          if(found){
            inventory[i].quantity = found.quantity;
          }
        }
      }
      
      send(res, 200, {
        success: true,
        result: inventory,
      });
    } catch(error) {
      console.log(error)
      send(res, 500, {
        success: false,
        result: error,
      });
    }
  });
})

exports.sendPrayers = functions.https.onRequest((req, res) => {
  cors(req, res, async () =>{
    const body = req.body;

    let prayer = body.prayer;
    //attemps to send an email to vincent that an order was recieved
    sendgrid.setApiKey(SENDGRID_API_KEY);
    try{
      const body = '<p>' + prayer + '</p>';
      //send prayer email to vincent
      const msg = {
        to: 'vpvessels@gmail.com',
      // Change to your recipient
        from: 'vesselsclothingorders@gmail.com',
      // Change to your verified sender
        subject: 'Prayer Request From Vessels Website!',
        html:  body,
    }      
    sendgrid
      .send(msg)
      .then((resp) => {
        console.log('Email sent\n', resp)
      })

      send(res, 200, {
        success: true,
      });
    } catch(error) {
      console.log(error)
      send(res, 500, {
        success: false,
        result: error,
      });
    }
  });
})

