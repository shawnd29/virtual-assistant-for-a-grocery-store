var moment = require('moment');
const functions = require('firebase-functions');
var admin = require("firebase-admin");
var math = require('mathjs');
admin.initializeApp();
var firestore = admin.firestore();
var item, col, password, chq = 0, amount = 0, obtained = 0, expired = 0, add = 0, sub = 0, id = 0,num=0,quantity=0,disc=0, less = 0, pric=0;
var arr = ['name', 'about', 'location', 'price', 'quantity', 'discount', 'id', 'obtained', 'expired','type']

exports.webhook = functions.https.onRequest((request, response) => {

    switch (request.body.result.action) {

        // search for an item in the db

        case 'db_content':
            firestore.collection('Test').get()
                .then((snapshot) => {

                    var orders = [];
                    snapshot.forEach((doc) => { orders.push(doc.data()) });

                    var speech = `There are a total of ${orders.length} items in the store ranging from ${orders[0].name}s to ${orders[orders.length - 1].name}s. you can serach for your items and add it to the cart later.`;

                    return response.send({
                        speech: speech
                    });
                })
                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })
            break;

            case 'items_all':
            firestore.collection('Test').get()
                .then((snapshot) => {

                    var orders = [];
                    snapshot.forEach((doc) => { orders.push(doc.data()) });

                    var speech = `There are a total of ${orders.length} items in the store as shown as follows:`;

                    orders.forEach((eachOrder, index) => {
                        speech += `${eachOrder.name}  \n`
                    })
                    return response.send({
                        speech: speech
                    });
                })
                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })
            break;

        case 'db_sort':
            citiesRef = firestore.collection('Test').get()
                .then(snapshot => {
                    var i = 1;
                    snapshot.forEach(res => {
                        var cityRef3 = firestore.collection('Test').doc(res.id);
                        cityRef3.update({ id: i });
                        i++;
                    });
                    return response.send({
                        speech: 'All the item ID have been successfully updated'
                    });
                })
                .catch(err => {
                    console.log('Error getting documents', err);
                });

            break;

        case 'item_location':
            item = request.body.result.parameters.product.toLowerCase().trim();
            console.log("item = ", item);
            console.log(response);
            col = firestore.collection('Test').where('name', '==', item).get()
                .then(snapshot => {

                    var orders = [];
                    snapshot.forEach((doc) => { orders.push(doc.data()) });
                    if (orders.length === 0) {
                        return response.send({
                            speech: 'We currently do not have this item as of now, we will find stock as soon as possible!'
                        });
                    } else {
                        var speech = ` `;

                        orders.forEach((eachOrder, index) => {
                            speech += `${eachOrder.name} is found at ${eachOrder.location}  \n`
                        })

                        return response.send({
                            speech: speech
                        });

                    }

                })

                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })

            break;

        case 'item_price':
            item = request.body.result.parameters.product.toLowerCase().trim();
            console.log("item = ", item);
            col = firestore.collection('Test').where('name', '==', item).get()
                .then(snapshot => {

                    var orders = [];
                    snapshot.forEach((doc) => { orders.push(doc.data()) });
                    if (orders.length === 0) {
                        return response.send({
                            speech: 'We currently do not have this item as of now, we will find stock as soon as possible!'
                        });
                    } else {
                        var speech = ` `;

                        orders.forEach((eachOrder, index) => {
                            speech += `The price of ${eachOrder.name} is ₹${eachOrder.price} per unit \n`
                        })

                        return response.send({
                            speech: speech
                        });

                    }

                })

                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })

            break;
        case 'item_about':
            item = request.body.result.parameters.product.toLowerCase().trim();
            console.log("item = ", item);
            col = firestore.collection('Test').where('name', '==', item).get()
                .then(snapshot => {

                    var orders = [];
                    snapshot.forEach((doc) => { orders.push(doc.data()) });
                    if (orders.length === 0) {
                        return response.send({
                            speech: 'We currently do not have this item as of now, we will find stock as soon as possible!'
                        });
                    } else {
                        var speech = `Here is a fun fact about the ${item}
                     \n `;

                        orders.forEach((eachOrder, index) => {
                            add = moment().subtract(eachOrder.obtained, 'd').calendar();
                            sub = moment().add(eachOrder.expired, 'd').calendar();
                            speech += `  \n We have ${math.floor(eachOrder.quantity)} ${eachOrder.name}s which cost  ₹${eachOrder.price} per unit. There is a discount of ₹${eachOrder.discount} today.  \n`
                            //This was produced on: ${add} and expires on: ${sub}
                        })

                        return response.send({
                            speech: speech
                        });

                    }

                })

                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })

            break;

        case 'item_quantity':
            item = request.body.result.parameters.product.toLowerCase().trim();
            console.log("item = ", item);
            col = firestore.collection('Test').where('name', '==', item).get()
                .then(snapshot => {

                    var orders = [];
                    snapshot.forEach((doc) => { orders.push(doc.data()) });
                    if (orders.length === 0) {
                        return response.send({
                            speech: 'We currently do not have this item as of now, we will find stock as soon as possible!'
                        });
                    } else {
                        var speech = ` `;

                        orders.forEach((eachOrder, index) => {
                            speech += `There are ${math.floor(eachOrder.quantity)} ${eachOrder.name} products in this store  \n`
                        })

                        return response.send({
                            speech: speech
                        });

                    }

                })

                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })

            break;

        case 'item_discount':
            item = request.body.result.parameters.product.toLowerCase().trim();
            console.log("item = ", item);
            col = firestore.collection('Test').where('name', '==', item).get()
                .then(snapshot => {

                    var orders = [];
                    snapshot.forEach((doc) => { orders.push(doc.data()) });
                    if (orders.length === 0) {
                        return response.send({
                            speech: 'We currently do not have this item as of now, we will find stock as soon as possible!'
                        });
                    } else {
                        var speech = ` `;

                        orders.forEach((eachOrder, index) => {
                            speech += `There is a discount of ₹${eachOrder.discount} on each ${eachOrder.name} today \n`
                        })

                        return response.send({
                            speech: speech
                        });

                    }

                })

                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })

            break;

        case 'item_produced':

            x = 0
            var item = request.body.result.parameters.product.toLowerCase().trim();
            if (x < 1) {
                var cityRef1 = firestore.collection('Test').doc(item).get()
                    .then(doc => {
                        if (!doc.exists) {

                            return response.send({
                                speech: "This item is not available in the store"
                            });

                        }
                        else {
                            obtained = doc.data().obtained;
                            speech = ` `;


                            speech += `We got this item on: ${moment().subtract(obtained, 'd').calendar()} \n`

                            return response.send({
                                speech: speech
                            });

                        }
                    })
                    .catch(err => {
                        console.log('Error getting document', err);
                    });
            }

            break;

case 'item_max':
col = firestore.collection('Test').get()
.then(snapshot => {

    var orders = [];
    snapshot.forEach((doc) => { orders.push(doc.data()) });
    

    var greatest=0,i, indexOfGreatest;
  for (i = 0; i < orders.length; i++) {
    if (orders[i].price > greatest) {
      greatest = orders[i].price;
      indexOfGreatest = i;
    }
  }
        var speech = `The most expensive product is ${orders[indexOfGreatest].name} which costs ₹${orders[indexOfGreatest].price}`;

        
        return response.send({
            speech: speech
        });

    

})

.catch((err) => {
    console.log('Error getting documents', err);

    response.send({
        speech: "something went wrong when reading from database"
    })
})
break;

        case 'item_expired':

            x = 0
            item = request.body.result.parameters.product.toLowerCase().trim();
            if (x < 1) {
                cityRef1 = firestore.collection('Test').doc(item).get()
                    .then(doc => {
                        if (!doc.exists) {

                            return response.send({
                                speech: "This item is not available in the store"
                            });

                        }
                        else {
                            expired = doc.data().expired;
                            speech = ` `;


                            speech += `This item will expire on: ${moment().add(expired, 'd').calendar()} \n`

                            return response.send({
                                speech: speech
                            });

                        }
                    })
                    .catch(err => {
                        console.log('Error getting document', err);
                    });
            }

            break;
            case 'item_discount_max':
            col = firestore.collection('Test').get()
            .then(snapshot => {
            
                var orders = [];
                snapshot.forEach((doc) => { orders.push(doc.data()) });
                
            
                var greatest=0,i, indexOfGreatest;
              for (i = 0; i < orders.length; i++) {
                if (orders[i].discount > greatest) {
                  greatest = orders[i].discount;
                  indexOfGreatest = i;
                }
              }
                    var speech = `The best offer today is on ${orders[indexOfGreatest].name} which has a discount of ₹${orders[indexOfGreatest].discount}`;
            
                    
                    return response.send({
                        speech: speech
                    });
            
                
            
            })
            
            .catch((err) => {
                console.log('Error getting documents', err);
            
                response.send({
                    speech: "something went wrong when reading from database"
                })
            })
            break;
            

        case 'item_scan':
            num = request.body.result.parameters.number;
            console.log("scan = ", num);
            col = firestore.collection('Test').where('id', '==', num).get()
                .then(snapshot => {

                    var orders = [];
                    snapshot.forEach((doc) => { orders.push(doc.data()) });
                    if (orders.length !== 0) {var speech = `Here is everything to know about the product :`;

                        orders.forEach((eachOrder, index) => {
                            speech += `  \n We have ${math.floor(eachOrder.quantity)} ${eachOrder.name}s which cost  ₹${eachOrder.price}. There is a discount of ₹${eachOrder.discount} today.  \n`
                        })

                        return response.send({
                            speech: speech
                        });
                        
                    } else {
                        return response.send({
                            speech: 'This is an invalid ID. Please try to scan again'
                        });

                    }

                })

                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })


            break;
        case 'item_types':
            x = 3, i = 1;
            var speech = '';
            if (x < 4) {
                item = request.body.result.parameters.name.toLowerCase().trim();

                var citiesRef = firestore.collection('Type').doc(item).get()
                    .then(snapshot => {
                        if (snapshot.exists) {

                            cityRef = firestore.collection('Type').doc(item);
                            console.log(doc());
                            console.log(doc().size);
                            speech = `There are a total of ${cityRef.size} types of ${item}s and they are shown as follows:`;
                            var orders = [];
                            cityRef.forEach(i => {
                                speech += ` ${doc().i} `;
                                i++;
                            })
                            return response.send({
                                speech: speech
                            })
                        }
                        else {
                            var citiesRef = firestore.collection('Test').doc(item).get()
                                .then(snapshot => {
                                    if (snapshot.exists) {
                                        speech = `We only have one brand of ${item} as of now:`;
                                    }
                                    else {
                                        speech = `We do not have this item in the store`;
                                    }
                                    return response.send({
                                        speech: speech
                                    })
                                })
                                .catch(err => {
                                    console.log('Error getting documents', err);
                                });
                        }
                        return console.log('Type done');
                    })
                    .catch(err => {
                        console.log('Error getting documents', err);
                    });
            }
            break;
        // check to add a value to the db

        case 'item_iteresting':
        product = request.body.result.parameters.product.toLowerCase().trim();
        console.log("interesting  = ", product);
        col = firestore.collection('Test').where('name', '==', product).get()
            .then(snapshot => {

                var orders = [];
                snapshot.forEach((doc) => { orders.push(doc.data()) });
                if (orders.length === 0) {
                    return response.send({
                        speech: 'This item does not exist in the store'
                    });
                } else {
                    var speech = `Here is something interesting about ${product}, it is ${orders[0].about}`;

                   
                    return response.send({
                        speech: speech
                    });

                }

            })

            .catch((err) => {
                console.log('Error getting documents', err);

                response.send({
                    speech: "something went wrong when reading from database"
                })
            })
        break;
        case 'add_db_chq':
            item = request.body.result.parameters.product.toLowerCase().trim();
            password = request.body.result.parameters.password;
            console.log("item = ", item);
            if (password === 1547) {
                col = firestore.collection('Test').where('name', '==', item).get()
                    .then(snapshot => {

                        var orders = [];
                        snapshot.forEach((doc) => { orders.push(doc.data()) });
                        if (orders.length === 0) {
                            return response.send({
                                speech: 'This item is not in the database.  \n Would you like to add the necessary values?'
                            });
                        } else {
                            // prevent continuation of a followup
                            let responseJson = {};
                            responseJson.speech = 'This item is already in the database.  \n See if you want to add some other item or modify this item later';
                            responseJson.displayText = 'This item is already in the database.  \n See if you want to add some other item or modify this item later';
                            var contextStr = '[{"name":"addtodatabase-followup","lifespan":0,"parameters":{}}]';
                            var contextObj = JSON.parse(contextStr);
                            responseJson.contextOut = contextObj;
                            console.log('Response:' + JSON.stringify(responseJson));
                            return response.json(responseJson);


                        }

                    })

                    .catch((err) => {
                        console.log('Error getting documents', err);

                        response.send({
                            speech: "something went wrong when reading from database"
                        })
                    })
            }
            else {
                let responseJson = {};
                responseJson.speech = 'This is the wrong password. Kindly refrain from adding or removing items from the database';
                responseJson.displayText = 'This is the wrong password. Kindly refrain from adding or removing items from the database';
                var contextStr = '[{"name":"addtodatabase-followup","lifespan":0,"parameters":{}}]';
                var contextObj = JSON.parse(contextStr);
                responseJson.contextOut = contextObj;
                console.log('Response:' + JSON.stringify(responseJson));
                return response.json(responseJson);




            }
            break;
        case 'add_db':


            var name = request.body.result.parameters.name.toLowerCase().trim();
            var about = request.body.result.parameters.about.toLowerCase().trim();
            var price = request.body.result.parameters.price;
            var location = request.body.result.parameters.location.toLowerCase().trim();
            var quantity = request.body.result.parameters.quantity;
            var discount = request.body.result.parameters.discount;
            var id = request.body.result.parameters.id;
            var obtained = request.body.result.parameters.obtained;
            var expired = request.body.result.parameters.expired;
            var type = request.body.result.parameters.location.toLowerCase().trim();
            
            console.log(name, 'has been added');
            console.log(about, 'has been added');
            console.log(price, 'has been added');
            console.log(location, 'has been added');
            console.log(quantity, 'has been added');
            console.log(discount, 'has been added');
            console.log(type, 'has been added');
            console.log(id, 'number has been added');
            console.log(obtained, 'date got has been added');
            console.log(expired, 'date perished has been added');
            var addDoc = firestore.collection('Test').doc(name).set({
                name: name,
                about: about,
                price: price,
                location: location,
                quantity: quantity,
                type: type,
                discount: discount,
                id: id,
                obtained: obtained,
                expired: expired
            }).then(ref => {
                console.log('Added document with ID: ', ref.id);
                return response.send({
                    speech:
                        `This poduct has been added to the database`
                })
            });

            break;
        case 'update_db_chq':
            item = request.body.result.parameters.product.toLowerCase().trim();
            password = request.body.result.parameters.password;
            attribute = request.body.result.parameters.attribute.toLowerCase().trim();
            console.log("item = ", item);
            if (password === 1547) {
                arr.forEach((i) => {
                    if (i === attribute) {
                        chq = 1;
                    }
                });
                if (chq === 0) {

                    let responseJson = {};
                    responseJson.speech = 'This is not a valid attribute.  \n  Please add a valid attribute name when doing it the next time';
                    responseJson.displayText = 'This is not a valid attribute.  \n  Please add a valid attribute name when doing it the next time';
                    contextStr = '[{"name":"databaseupdate-followup","lifespan":0,"parameters":{}}]';
                    contextObj = JSON.parse(contextStr);
                    responseJson.contextOut = contextObj;
                    console.log('Response:' + JSON.stringify(responseJson));
                    return response.json(responseJson);
                }
                chq = 0;
                col = firestore.collection('Test').where('name', '==', item).get()
                    .then(snapshot => {

                        var orders = [];
                        snapshot.forEach((doc) => { orders.push(doc.data()) });
                        if (orders.length === 1) {
                            var v1;
                            switch (attribute) {
                                case 'name':
                                    v1 = orders[0].name;
                                    break;
                                case 'about':
                                    v1 = orders[0].about;
                                    break;
                                case 'discount':
                                    v1 = orders[0].discount;
                                    break;
                                case 'location':
                                    v1 = orders[0].location;
                                    break;
                                case 'price':
                                    v1 = orders[0].price;
                                    break;
                                case 'quantity':
                                    v1 = orders[0].quantity;
                                    break;
                                case 'id':
                                    v1 = orders[0].id;
                                    break;
                                case 'obtained':
                                    v1 = orders[0].obtained;
                                    break;
                                case 'expired':
                                    v1 = orders[0].expired;
                                    break;
                                    case 'type':
                                    v1 = orders[0].type;
                                    break;

                            }
                            console.log(v1);
                            return response.send({
                                speech:
                                    `The attribute " ${attribute}" has the following value:  \n ${attribute} = ${v1}  \n  Would you like to change this value?`
                            })

                        } else {

                            let responseJson = {};
                            responseJson.speech = 'This item is not in the database.  \n Check if you want to modify some other item later';
                            responseJson.displayText = 'This item is not in the database.  \n Check if you want to modify some other item later';
                            var contextStr = '[{"name":"databaseupdate-followup","lifespan":0,"parameters":{}}]';
                            var contextObj = JSON.parse(contextStr);
                            responseJson.contextOut = contextObj;
                            console.log('Response:' + JSON.stringify(responseJson));
                            return response.json(responseJson);


                        }

                    })

                    .catch((err) => {
                        console.log('Error getting documents', err);

                        response.send({
                            speech: "something went wrong when reading from database"
                        })
                    })
            }
            else {
                let responseJson = {};
                responseJson.speech = 'This is the wrong password. Kindly refrain from adding or removing items from the database';
                responseJson.displayText = 'This is the wrong password. Kindly refrain from adding or removing items from the database';
                contextStr = '[{"name":"databaseupdate-followup","lifespan":0,"parameters":{}}]';
                contextObj = JSON.parse(contextStr);
                responseJson.contextOut = contextObj;
                console.log('Response:' + JSON.stringify(responseJson));
                return response.json(responseJson);




            }
            break;
        case 'update_db':


            item = request.body.result.parameters.product.toLowerCase().trim();
            attribute_n = request.body.result.parameters.attribute_n.toLowerCase().trim();
            attribute = request.body.result.parameters.attribute.toLowerCase().trim();
            console.log("item = ", item);
            console.log("new attribute = ", attribute_n);
            col = firestore.collection('Test').doc(item);
            switch (attribute) {
                case 'name':
                    col.update({ name: attribute_n });
                    break;
                case 'about':
                    col.update({ about: attribute_n });
                    break;
                case 'discount':
                    col.update({ discount: attribute_n });
                    break;
                case 'location':
                    col.update({ location: attribute_n });
                    break;
                case 'price':
                    col.update({ price: attribute_n });
                    break;
                case 'quantity':
                    col.update({ quantity: attribute_n });
                    break;
                case 'id':
                    col.update({ id: attribute_n });
                    break;
                case 'obtained':
                    col.update({ obtained: attribute_n });
                    break;
                case 'expired':
                    col.update({ expired: attribute_n });
                    break;

                case 'type':
                col.update({ type: attribute_n });
                break;
            }

            response.send({
                speech:
                    `The attribute "${attribute}" for "${item}" has been updated from" ${attribute}" to "${attribute_n}"  \n`
            })

            break;

        case 'remove_db_chq':
            item = request.body.result.parameters.product.toLowerCase().trim();
            password = request.body.result.parameters.password;
            console.log("item = ", item);
            if (password === 1547) {
                col = firestore.collection('Test').where('name', '==', item).get()
                    .then(snapshot => {

                        var orders = [];
                        snapshot.forEach((doc) => { orders.push(doc.data()) });
                        console.log(orders.length);
                        if (orders.length === 1) {
                            return response.send({
                                speech: `The contents of ${orders[0].name} will be deleted permanently.  \n  Are you sure that you want to delete this value?`
                            });
                        } else {

                            let responseJson = {};
                            responseJson.speech = 'This item is not in the database.  \n Check if you want to delete some other item later';
                            responseJson.displayText = 'This item is not in the database.  \n Check if you want to delete some other item later';
                            var contextStr = '[{"name":"databasedelete-followup","lifespan":0,"parameters":{}}]';
                            var contextObj = JSON.parse(contextStr);
                            responseJson.contextOut = contextObj;
                            console.log('Response:' + JSON.stringify(responseJson));
                            return response.json(responseJson);



                        }

                    })

                    .catch((err) => {
                        console.log('Error getting documents', err);

                        response.send({
                            speech: "something went wrong when reading from database"
                        })
                    })
            }
            else {
                let responseJson = {};
                responseJson.speech = 'This is the wrong password. Kindly refrain from adding or removing items from the database';
                responseJson.displayText = 'This is the wrong password. Kindly refrain from adding or removing items from the database';
                contextStr = '[{"name":"databasedelete-followup","lifespan":0,"parameters":{}}]';
                contextObj = JSON.parse(contextStr);
                responseJson.contextOut = contextObj;
                console.log('Response:' + JSON.stringify(responseJson));
                return response.json(responseJson);




            }

            break;
        case 'remove_db':
            item = request.body.result.parameters.product.toLowerCase().trim();
            var deleteDoc = firestore.collection('Test').doc(item).delete();

            var x = 1;
            speech = ` `;

            if (x === 1) {
                speech += `${item} has been successfully deleted from the database \n`


                return response.send({
                    speech: speech
                });
            }


            break;

        case 'add_cart_chq':
            item = request.body.result.parameters.product.toLowerCase().trim();
            amount = request.body.result.parameters.number;
            console.log("item = ", item);
            var cityRef = firestore.collection('Test').doc(item).get()
                .then(doc => {
                    if (!doc.exists) {
                        //                  console.log('whatever', doc.data().name);
                        let responseJson = {};
                        responseJson.speech = 'We currently do not have this item as of now, we will find stock as soon as possible!';
                        responseJson.displayText = 'We currently do not have this item as of now, we will find stock as soon as possible!';
                        contextStr = '[{"name":"addtocart-followup","lifespan":0,"parameters":{}}]';
                        contextObj = JSON.parse(contextStr);
                        responseJson.contextOut = contextObj;
                        console.log('Response:' + JSON.stringify(responseJson));
                        return response.json(responseJson);



                    } else {
                        console.log(doc.data().quantity);
                        if (doc.data().quantity < amount) {

                            let responseJson = {};
                            responseJson.speech = 'Our stock is limited as of now. Please come back when we have more!';
                            responseJson.displayText = 'Our stock is limited as of now. Please come back when we have more!';
                            contextStr = '[{"name":"addtocart-followup","lifespan":0,"parameters":{}}]';
                            contextObj = JSON.parse(contextStr);
                            responseJson.contextOut = contextObj;
                            console.log('Response:' + JSON.stringify(responseJson));
                            return response.json(responseJson);

                        }
                        else {
                            var cityRef1 = firestore.collection('Cart').doc(item).get()
                                .then(doc => {
                                    if (!doc.exists) {

                                        speech = ` `;


                                        speech += `Are you sure you want to add ${amount} ${item}s into the cart? \n`

                                        return response.send({
                                            speech: speech
                                        });

                                    }
                                    else {
                                        speech = ` `;

                                        console.log('part 2', doc.data().quantity);
                                        speech += `You already have ${doc.data().quantity} ${item}s in the cart. Are you sure you want to add ${amount} more? \n`

                                        return response.send({
                                            speech: speech
                                        });

                                    }
                                })
                                .catch(err => {
                                    console.log('Error getting document', err);
                                });

                        }
                        return console.log('Document data:', doc.data());
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });

            break;

        case 'add_cart':
            item = request.body.result.parameters.product.toLowerCase().trim();
            amount = request.body.result.parameters.number;
           
            console.log('amount =', amount);

            cityRef = firestore.collection('Test').doc(item).get()
                .then(doc => {

                    cityRef = firestore.collection('Test').doc(item);
                    less = doc.data().quantity;
                    disc = doc.data().discount;
                    pric = doc.data().price;
                    res = less - amount;
                    updateSingle = cityRef.update({ quantity: res });
                    console.log('price =', pric);

                    return console.log('less= ', less);
                })

                .catch(err => {
                    console.log('Error getting document', err);
                });



            var usersCollectionRef = firestore.collection('Cart');
            cityRef1 = firestore.collection('Cart').doc(item).get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('name= ', item);
                        console.log('amount= ', amount);
                        console.log('disc= ', disc);
                        console.log('pric= ', pric);


                        var addDoc1 = firestore.collection('Cart').doc(item).set({
                            name: item,
                            quantity: amount,
                            discount: disc,
                            price: pric
                        });

                        speech = ` `;

                        speech += `${amount} ${item}s have been added to the cart  \n`

                        return response.send({
                            speech: speech
                        });


                    }
                    else {
                        var cityRef2 = firestore.collection('Cart').doc(item);
                        var more = doc.data().quantity;
                        res = more + amount;
                        updateSingle = cityRef2.update({ quantity: res });



                        speech = ` `;

                        speech += `There are a total of ${res} ${item}s in the cart now  \n`

                        return response.send({
                            speech: speech
                        });
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });

            break;

        case 'items_cart':

            firestore.collection('Cart').get()
                .then((snapshot) => {

                    var orders = [];
                    snapshot.forEach((doc) => { orders.push(doc.data()) });

                    if (orders.length === 0) {
                        var speech = `You do not have any items in the cart as of now.   \n`;


                        return response.send({
                            speech: speech
                        });
                    }
                    else {

                        speech = `There are a total of ${orders.length} in your cart   \n They are listed as follows:   \n`;

                        orders.forEach((eachOrder, index) => {
                            speech += `  \n ${eachOrder.quantity} ${eachOrder.name}s `
                        })

                        return response.send({
                            speech: speech,

                        });
                    }
                })
                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })

            break;

        case 'bill_cart':

            firestore.collection('Cart').get()
                .then((snapshot) => {

                    var orders = [];
                    snapshot.forEach((doc) => { orders.push(doc.data()) });

                    if (orders.length === 0) {

                        var speech = `You do not have any items in the cart as of now.   \n`;


                        return response.send({
                            speech: speech
                        });
                    }
                    else {
                        var sum = 0, tsum = 0, val = 0;
                        speech = `There are a total of ${orders.length} items in your cart   \n They are listed as follows:   \n`;

                        orders.forEach((eachOrder, index) => {
                            sum = eachOrder.quantity * eachOrder.price;
                            val += eachOrder.quantity * eachOrder.price;
                            tsum += eachOrder.quantity * (eachOrder.price - eachOrder.discount);

                            speech += `  \n ${eachOrder.quantity} ${eachOrder.name}s  for ₹${sum}  \n`;
                        })

                        speech += `Your total bill comes up to ${val} but our special discounts brings it down to ${tsum}   \n`;

                        return response.send({

                            speech: speech
                        });
                    }
                })
                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })

            break;

        case 'cart_remove_chq':
            item = request.body.result.parameters.name.toLowerCase().trim();
            var iamount = request.body.result.parameters.number.toLowerCase().trim();
            if( (iamount.search('all'))===-1)
            amount = amount=parseInt(iamount, 10);
    else
        iamount='all';
    
            cityRef1 = firestore.collection('Cart').doc(item).get()
                .then(doc => {
                    if (!doc.exists) {


                        let responseJson = {};
                        responseJson.speech = 'This item is not in your cart';
                        responseJson.displayText = 'This item is not in your cart';
                        var contextStr = '[{"name":"removefromcart-followup","lifespan":0,"parameters":{}}]';
                        var contextObj = JSON.parse(contextStr);
                        responseJson.contextOut = contextObj;
                        console.log('Response:' + JSON.stringify(responseJson));
                        return response.json(responseJson);


                    }
                    else {
                        var cityRef2 = firestore.collection('Test').doc(item);
                        var more = doc.data().quantity;
                        if (amount >= more ||iamount==='all') {

                            speech = ` `;


                            speech += `You only have ${more} items in your cart. Are you sure you want to remove all the ${item}s from the cart? \n`

                            return response.send({
                                speech: speech
                            });


                        }
                        else {

                            speech = ` `;


                            speech += `Are you sure you want to remove ${amount} ${item}s from the cart? \n`

                            return response.send({
                                speech: speech
                            });


                        }


                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });


            break;

        case 'cart_remove':
            item = request.body.result.parameters.name.toLowerCase().trim();
             iamount = request.body.result.parameters.number.toLowerCase().trim();
            all= request.body.result.parameters.all;
            if( (iamount.search('all'))===-1)
            amount = amount=parseInt(iamount, 10);
    else
        iamount='all';
            var cart_q = 0, dev_q = 0, new_cart_q = 0, new_dev_q = 0;
            cityRef = firestore.collection('Cart').doc(item).get()
                .then(doc => {
                    cityRef1 = firestore.collection('Cart').doc(item);
                    cart_q = doc.data().quantity;
                    if(iamount==='all'||all==='all')
                    {amount=cart_q;
                    }
                    else{
                        amount=parseInt(iamount, 10);
                    }
                    console.log('cart items= ', cart_q);
                    console.log('amount= ', amount);
                    cityRef = firestore.collection('Test').doc(item).get()
                        .then(doc1 => {
                            cityRef = firestore.collection('Test').doc(item);
                            dev_q = doc1.data().quantity;
                            console.log('DB items= ', dev_q);

                            new_cart_q = cart_q - amount;
                            new_dev_q = dev_q + amount;
                            console.log('Old DB items= ', new_dev_q);
                            console.log('Old cart items= ', new_cart_q);
                            if (new_cart_q <= 0) {
                                new_cart_q = cart_q;
                                new_dev_q = dev_q + cart_q;
                            }
                            console.log('Updated DB items= ', new_dev_q);
                            console.log('Updated cart items= ', new_cart_q);
                            var update_dev = firestore.collection('Test').doc(item).update({
                                quantity: new_dev_q
                            })
                            var update_cart = firestore.collection('Cart').doc(item).update({
                                quantity: new_cart_q
                            })

                            if (amount >= cart_q) {
                                deleteDoc = firestore.collection('Cart').doc(item).delete();

                                speech = ` `;


                                speech += `All of the ${new_cart_q} ${item}s have been removed from the cart. \n`

                                return response.send({
                                    speech: speech
                                });
                            }
                            else {


                                speech = ` `;


                                speech += `${amount} ${item}s have been removed from the cart. \n`

                                return response.send({
                                    speech: speech
                                });
                            }

                        })
                        .catch(err => {
                            console.log('Error getting document', err);
                        });
                    return console.log('removed');
                })

                .catch(err => {
                    console.log('Error getting document', err);
                });
            break;

        case 'cart_remove_all_chq':
            firestore.collection('Cart').get()
                .then((snapshot) => {

                    var orders = [];
                    snapshot.forEach((doc) => { orders.push(doc.data()) });

                    if (orders.length === 0) {

                        let responseJson = {};
                        responseJson.speech = 'You currently do not have any items in the cart as of now!';
                        responseJson.displayText = 'You currently do not have any items in the cart as of now!';
                        contextStr = '[{"name":"cart_remove_all-followup","lifespan":0,"parameters":{}}]';
                        contextObj = JSON.parse(contextStr);
                        responseJson.contextOut = contextObj;
                        console.log('Response:' + JSON.stringify(responseJson));
                        return response.json(responseJson);
                    }
                    else {
                        
                        speech = `There are a total of ${orders.length} items in your cart   \n They are listed as follows:   \n`;

                        orders.forEach((eachOrder, index) => {

                            speech += `  \n ${eachOrder.quantity} ${eachOrder.name}s   \n`;
                        })

                        speech += `Are you sure that you want to remove all these items?  \n`;

                        return response.send({

                            speech: speech
                        });
                    }
                })

                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })

            break;

case 'cart_remove_all':
var orders = [];
 cart_q = 0,dev_q = 0, new_dev_q = 0;
firestore.collection('Cart').get()
.then((snapshot) => {
      snapshot.forEach((doc) => { orders.push(doc.data()) });

      orders.forEach((item,index) => 
      {
        cart_q = item.quantity;
        console.log('cart items= ', cart_q);

        cityRef = firestore.collection('Test').doc(item.name).get()
            .then(doc1 => {
                dev_q= doc1.data().quantity;
                
                console.log('DB items= ', dev_q);

                
                new_dev_q = dev_q + cart_q;
                
                console.log('Updated DB items= ', new_dev_q);
                
                var update_dev = firestore.collection('Test').doc(item.name).update({
                    quantity: new_dev_q
                })
                
                    deleteDoc = firestore.collection('Cart').doc(item.name).delete();

                    speech = ` `;


                    speech += `All of the items have been removed from the cart. \n`

                    return response.send({
                        speech: speech
                    });
                
               

            })
            .catch(err => {
                console.log('Error getting document', err);
            });
      
        
        });
    return console.log('All items have been removed');            
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        
            response.send({
                speech: "something went wrong when reading from database"
            })
        })
                
        

break;


case'repeat':
item = request.body.result.parameters.any;
response.send({
    speech: item
})
break;
        case 'test1':
            x = 5;
            item = request.body.result.parameters.product.toLowerCase().trim();
            if (x < 6) {

                cityRef = firestore.collection('Test').doc(item).get()
                    .then(doc => {

                        cityRef = firestore.collection('Test').doc(item);
                        obtained = doc.data().obtained;
                        expired = doc.data().expired;

                        speech = ` `;


                        speech += `Manufactured on: ${moment().subtract(obtained, 'd')} Expires on: ${moment().add(expired, 'd').calendar()} \n`

                        return response.send({
                            speech: speech
                        });

                    })

                    .catch(err => {
                        console.log('Error getting document', err);
                    });




            }
            break;


        case 'hello_world':


            var itm = request.body.result.parameters.name;
            console.log(itm, 'has been added');
            response.send({
                speech:
                    `Hello! I am your ${itm}  personal assistant.`
            })
            break;


        default:
            response.send({
                speech: "no action matched in webhook"
            })
    }

});
/* 
case 'cart_remove_all':
var orders = [];
 cart_q = 0,dev_q = 0, new_dev_q = 0;
firestore.collection('Cart').get()
.then((snapshot) => {
      snapshot.forEach((doc) => { orders.push(doc.data()) });

      orders.forEach((item,index) => 
      {
      var cityRef2 = firestore.collection('Cart').doc(orders[index].name);
      console.log(cityRef2);
        cart_q = cityRef2.quantity;
        console.log('cart items= ', cart_q);

        cityRef = firestore.collection('Test').doc(orders[index].name).get()
            .then(doc1 => {
                var cityRef3 = firestore.collection('Test').doc(orders[index].name);
                dev_q = cityRef3.quantity;
                console.log('DB items= ', dev_q);

                
                new_dev_q = dev_q + cart_q;
                
                console.log('Updated DB items= ', new_dev_q);
                
                var update_dev = firestore.collection('Test').doc(orders[index].name).update({
                    quantity: new_dev_q
                })
                
                    deleteDoc = firestore.collection('Cart').doc(orders[index].name).delete();

                    speech = ` `;


                    speech += `All of the items have been removed from the cart. \n`

                    return response.send({
                        speech: speech
                    });
                
               

            })
            .catch(err => {
                console.log('Error getting document', err);
            });
      
        
        });
    return console.log('All items have been removed');            
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        
            response.send({
                speech: "something went wrong when reading from database"
            })
        })
                
        

break;
*/

