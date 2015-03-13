/*globals _,test,expect,ok,equal,deepEqual,strictEqual,notStrictEqual*/

if( typeof module !== "undefined" && typeof require !== "undefined" ){
  var _ = require('underscore');
  _.mixin( require('../underscore.deferred') );
}

var xtest = function(name){
  if( typeof console !== "undefined" ){
    console.log('Skipped Test: '+ name);
  }
};

test("its should be part of Underscore", function() {
  ok( _.VERSION );
  ok( _.Deferred );
  ok( _.when );
  ok( _.Callbacks );
});
var _expandedEach;

_.each( [ "", " - new operator" ], function( withNew ) {

  function createDeferred( fn ) {
    return withNew ? new _.Deferred( fn ) : _.Deferred( fn );
  }

  test("_.Deferred" + withNew, function() {

    expect( 23 );

    var defer = createDeferred();

    strictEqual( defer.pipe, defer.then, "pipe is an alias of then" );

    createDeferred().resolve().done(function() {
      ok( true , "Success on resolve" );
      strictEqual( this.state(), "resolved", "Deferred is resolved (state)" );
    }).fail(function() {
      ok( false , "Error on resolve" );
    }).always(function() {
      ok( true , "Always callback on resolve" );
    });

    createDeferred().reject().done(function() {
      ok( false , "Success on reject" );
    }).fail(function() {
      ok( true , "Error on reject" );
      strictEqual( this.state(), "rejected", "Deferred is rejected (state)" );
    }).always(function() {
      ok( true , "Always callback on reject" );
    });

    createDeferred(function( defer ) {
      ok( this === defer , "Defer passed as this & first argument" );
      this.resolve( "done" );
    }).done( function( value ) {
      strictEqual( value , "done" , "Passed function executed" );
    });

    createDeferred(function( defer ) {
      var promise = defer.promise(),
        func = function() {},
        funcPromise = defer.promise( func );
      strictEqual( defer.promise(), promise, "promise is always the same" );
      strictEqual( funcPromise, func, "non objects get extended" );
      _.each( promise, function( value, key ) {
        if ( !_.isFunction( promise[ key ] ) ) {
          ok( false, key + " is a function (" + _.type( promise[ key ] ) + ")" );
        }
        if ( promise[ key ] !== func[ key ] ) {
          strictEqual( func[ key ], promise[ key ], key + " is the same" );
        }
      });
    });

    _expandedEach = _.each;
    _expandedEach( "resolve reject".split( " " ), function( change ) {
      createDeferred( function( defer ) {
        strictEqual( defer.state(), "pending", "pending after creation" );
        var checked = 0;
        defer.progress(function( value ) {
          strictEqual( value, checked, "Progress: right value (" + value + ") received" );
        });
        for( checked = 0; checked < 3 ; checked++ ) {
          defer.notify( checked );
        }
        strictEqual( defer.state(), "pending", "pending after notification" );
        defer[ change ]();
        notStrictEqual( defer.state(), "pending", "not pending after " + change );
        defer.notify();
      });
    });
  });

} );


test( "_.Deferred - chainability", function() {

  var defer = _.Deferred();

  expect( 10 );

  _expandedEach = _.each;
  _expandedEach( "resolve reject notify resolveWith rejectWith notifyWith done fail progress always".split( " " ), function( method ) {
    var object = { m: defer[ method ] };
    strictEqual( object.m(), object, method + " is chainable" );
  });
});


test( "_.Deferred.then - filtering (done)", function() {

  expect(4);

  var defer = _.Deferred(),
    piped = defer.then(function( a, b ) {
      return a * b;
    }),
    value1,
    value2,
    value3;

  piped.done(function( result ) {
    value3 = result;
  });

  defer.done(function( a, b ) {
    value1 = a;
    value2 = b;
  });

  defer.resolve( 2, 3 );

  strictEqual( value1, 2, "first resolve value ok" );
  strictEqual( value2, 3, "second resolve value ok" );
  strictEqual( value3, 6, "result of filter ok" );

  _.Deferred().reject().then(function() {
    ok( false, "pipe should not be called on reject" );
  });

  _.Deferred().resolve().then( function(){} ).done(function( value ) {
    strictEqual( value, undefined, "pipe done callback can return undefined/null" );
  });
});


// This is intentionally skipped, and is the known point of failure in
// the jQuery tests due to divergent interpretations of Promises/A

xtest( "_.Deferred.then - filtering (fail)", function() {

  expect(4);

  var defer = _.Deferred(),
    piped = defer.then( null, function( a, b ) {
      return a * b;
    } ),
    value1,
    value2,
    value3;

  piped.fail(function( result ) {
    value3 = result;
  });

  defer.fail(function( a, b ) {
    value1 = a;
    value2 = b;
  });

  defer.reject( 2, 3 );

  strictEqual( value1, 2, "first reject value ok" );
  strictEqual( value2, 3, "second reject value ok" );
  strictEqual( value3, 6, "result of filter ok" );

  _.Deferred().resolve().then( null, function() {
    ok( false, "pipe should not be called on resolve" );
  } );

  _.Deferred().reject().pipe( null, _.noop ).fail(function( value ) {
    strictEqual( value, undefined, "pipe fail callback can return undefined/null" );
  });
});


test( "_.Deferred.then - filtering (progress)", function() {

  expect(3);

  var defer = _.Deferred(),
    piped = defer.then( null, null, function( a, b ) {
      return a * b;
    } ),
    value1,
    value2,
    value3;

  piped.progress(function( result ) {
    value3 = result;
  });

  defer.progress(function( a, b ) {
    value1 = a;
    value2 = b;
  });

  defer.notify( 2, 3 );

  strictEqual( value1, 2, "first progress value ok" );
  strictEqual( value2, 3, "second progress value ok" );
  strictEqual( value3, 6, "result of filter ok" );
});

test( "_.Deferred.then - deferred (done)", function() {

  expect(3);

  var defer = _.Deferred(),
    piped = defer.then(function( a, b ) {
      return _.Deferred(function( defer ) {
        defer.reject( a * b );
      });
    }),
    value1,
    value2,
    value3;

  piped.fail(function( result ) {
    value3 = result;
  });

  defer.done(function( a, b ) {
    value1 = a;
    value2 = b;
  });

  defer.resolve( 2, 3 );

  strictEqual( value1, 2, "first resolve value ok" );
  strictEqual( value2, 3, "second resolve value ok" );
  strictEqual( value3, 6, "result of filter ok" );
});

test( "_.Deferred.then - deferred (fail)", function() {

  expect(3);

  var defer = _.Deferred(),
    piped = defer.then( null, function( a, b ) {
      return _.Deferred(function( defer ) {
        defer.resolve( a * b );
      });
    } ),
    value1,
    value2,
    value3;

  piped.done(function( result ) {
    value3 = result;
  });

  defer.fail(function( a, b ) {
    value1 = a;
    value2 = b;
  });

  defer.reject( 2, 3 );

  strictEqual( value1, 2, "first reject value ok" );
  strictEqual( value2, 3, "second reject value ok" );
  strictEqual( value3, 6, "result of filter ok" );
});

test( "_.Deferred.then - deferred (progress)", function() {

  expect(3);

  var defer = _.Deferred(),
    piped = defer.then( null, null, function( a, b ) {
      return _.Deferred(function( defer ) {
        defer.resolve( a * b );
      });
    } ),
    value1,
    value2,
    value3;

  piped.done(function( result ) {
    value3 = result;
  });

  defer.progress(function( a, b ) {
    value1 = a;
    value2 = b;
  });

  defer.notify( 2, 3 );

  strictEqual( value1, 2, "first progress value ok" );
  strictEqual( value2, 3, "second progress value ok" );
  strictEqual( value3, 6, "result of filter ok" );
});

test( "_.Deferred.then - context", function() {

  expect(4);

  var context = {};

  _.Deferred().resolveWith( context, [ 2 ] ).then(function( value ) {
    return value * 3;
  }).done(function( value ) {
    strictEqual( this, context, "custom context correctly propagated" );
    strictEqual( value, 6, "proper value received" );
  });

  var defer = _.Deferred(),
    piped = defer.then(function( value ) {
      return value * 3;
    });

  defer.resolve( 2 );

  piped.done(function( value ) {
    strictEqual( this.promise(), piped, "default context gets updated to latest defer in the chain" );
    strictEqual( value, 6, "proper value received" );
  });
});

test( "_.when" , function() {

  expect( 40 );

  var win = typeof window === "undefined" ? global : window;

  // Some other objects
  _.each( {

    "an empty string": "",
    "a non-empty string": "some string",
    "zero": 0,
    "a number other than zero": 1,
    "true": true,
    "false": false,
    "null": null,
    "undefined": undefined,
    "a plain object": {}

  } , function( value, message ) {

    ok( _.isFunction( _.when( value ).done(function( resolveValue ) {
      strictEqual( this, win, "Context is the global object with " + message );
      strictEqual( resolveValue , value , "Test the promise was resolved with " + message );
    }).promise ) , "Test " + message + " triggers the creation of a new Promise" );

  } );

  ok( _.isFunction( _.when().done(function( resolveValue ) {
    strictEqual( this, win, "Test the promise was resolved with window as its context" );
    strictEqual( resolveValue, undefined, "Test the promise was resolved with no parameter" );
  }).promise ) , "Test calling when with no parameter triggers the creation of a new Promise" );

  var context = {};

  _.when( _.Deferred().resolveWith( context ) ).done(function() {
    strictEqual( this, context, "when( promise ) propagates context" );
  });

  var cache;

  _.each([ 1, 2, 3 ], function(i, k) {

    _.when( cache || _.Deferred( function() {
        this.resolve( i );
      })
    ).done(function( value ) {

      strictEqual( value, 1 , "Function executed" + ( i > 1 ? " only once" : "" ) );
      cache = value;
    });

  });

  // Will apply the contents of an array if it's a single argument
  var dfds = [ _.Deferred(), _.Deferred(), _.Deferred() ];

  var promises = _.map(dfds, function(dfd){
    return dfd.promise();
  });

  _.each(dfds, function(dfd, index){
    dfd.resolve( "Promise "+ (index + 1) );
  });

  _.when(promises).done(function(){
    var args = [].slice.call(arguments);
    _.each([ 1, 2, 3], function(i, k){
      equal( args[k], "Promise "+ i );
    });
  });

  // But will treat Arrays normally if they're not the only argument
  _.when(promises, "foo").done(function(p, s){
    strictEqual(p, promises);
    equal(s, "foo");
  });

  // And work on mixed arrays (with Deferreds and normal objects)
  promises.splice( 1, 0, { foo: "bar" });
  _.when(promises).done(function(res0, res1){
    deepEqual(res1, { foo: "bar"});
  });

});

test( "_.when - one item array as argument" , function() {

  expect( 33 );

  var win = typeof window === "undefined" ? global : window;

  // Some other objects
  _.each( {

    "an empty string": "",
    "a non-empty string": "some string",
    "zero": 0,
    "a number other than zero": 1,
    "true": true,
    "false": false,
    "null": null,
    "undefined": undefined,
    "a plain object": {}

  } , function( value, message ) {

    ok( _.isFunction( _.when( value ).done(function( resolveValue ) {
      strictEqual( this, win, "Context is the global object with " + message );
      strictEqual( resolveValue , value , "Test the promise was resolved with " + message );
    }).promise ) , "Test " + message + " triggers the creation of a new Promise" );

  } );

  ok( _.isFunction( _.when().done(function( resolveValue ) {
    strictEqual( this, win, "Test the promise was resolved with window as its context" );
    strictEqual( resolveValue, undefined, "Test the promise was resolved with no parameter" );
  }).promise ) , "Test calling when with no parameter triggers the creation of a new Promise" );

  var context = {};

  _.when( _.Deferred().resolveWith( context ) ).done(function() {
    strictEqual( this, context, "when( promise ) propagates context" );
  });

  var cache;

  _.each([ 1 ], function(i, k) {

    _.when( cache || _.Deferred( function() {
        this.resolve( i );
      })
    ).done(function( value ) {

      strictEqual( value, 1 , "Function executed" + ( i > 1 ? " only once" : "" ) );
      cache = value;
    });

  });

  // Will apply the contents of an array if it has a single item
  var dfds = [ _.Deferred() ];

  var promises = _.map(dfds, function(dfd){
    return dfd.promise();
  });

  _.each( dfds, function( dfd, index ){
    dfd.resolve( "Promise "+ (index + 1) );
  });

  _.when( promises ).done(function(){
    var args = [].slice.call(arguments);
    _.each([ 1 ], function(i, k){
      equal( args[k], "Promise "+ i );
    });
  });

});

test("_.when - joined", function() {

  expect( 119 );

  var deferreds = {
      value: 1,
      success: _.Deferred().resolve( 1 ),
      error: _.Deferred().reject( 0 ),
      futureSuccess: _.Deferred().notify( true ),
      futureError: _.Deferred().notify( true ),
      notify: _.Deferred().notify( true )
    },
    willSucceed = {
      value: true,
      success: true,
      futureSuccess: true
    },
    willError = {
      error: true,
      futureError: true
    },
    willNotify = {
      futureSuccess: true,
      futureError: true,
      notify: true
    };

  _.each( deferreds, function( defer1, id1 ) {
    _.each( deferreds, function( defer2, id2 ) {
      var shouldResolve = willSucceed[ id1 ] && willSucceed[ id2 ],
        shouldError = willError[ id1 ] || willError[ id2 ],
        shouldNotify = willNotify[ id1 ] || willNotify[ id2 ],
        expected = shouldResolve ? [ 1, 1 ] : [ 0, undefined ],
          expectedNotify = shouldNotify && [ willNotify[ id1 ], willNotify[ id2 ] ],
          code = id1 + "/" + id2,
          context1 = defer1 && _.isFunction( defer1.promise ) ? defer1 : undefined,
          context2 = defer2 && _.isFunction( defer2.promise ) ? defer2 : undefined;

      _.when( defer1, defer2 ).done(function( a, b ) {
        if ( shouldResolve ) {
          deepEqual( [ a, b ], expected, code + " => resolve" );
          strictEqual( this[ 0 ], context1, code + " => first context OK" );
          strictEqual( this[ 1 ], context2, code + " => second context OK" );
        } else {
          ok( false ,  code + " => resolve" );
        }
      }).fail(function( a, b ) {
        if ( shouldError ) {
          deepEqual( [ a, b ], expected, code + " => reject" );
        } else {
          ok( false ,  code + " => reject" );
        }
      }).progress(function( a, b ) {
        deepEqual( [ a, b ], expectedNotify, code + " => progress" );
        strictEqual( this[ 0 ], expectedNotify[ 0 ] ? context1 : undefined, code + " => first context OK" );
        strictEqual( this[ 1 ], expectedNotify[ 1 ] ? context2 : undefined, code + " => second context OK" );
      });
    } );
  } );
  deferreds.futureSuccess.resolve( 1 );
  deferreds.futureError.reject( 0 );
});